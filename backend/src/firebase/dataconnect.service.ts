import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  BadGatewayException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import { extractBearerToken } from '../common/decorators/auth-token.decorator';
import { ADMIN_OPERATIONS, FORCE_ADMIN_OPERATIONS } from './admin-operations';

/**
 * Service for executing GraphQL operations against Firebase Data Connect.
 * Uses the connector REST API endpoint, forwarding the caller's Firebase ID
 * token so that `@auth(level: USER)` operations resolve `auth.uid` correctly.
 */
@Injectable()
export class DataConnectService {
  private readonly logger = new Logger(DataConnectService.name);
  private readonly baseUrl: string;
  /** Service-level base (no /connectors/...), used for the admin :executeGraphql endpoint. */
  private readonly serviceBaseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  /** True when running against the local Firebase Data Connect emulator. */
  private readonly isEmulator: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService,
  ) {
    const projectId = this.configService.get<string>(
      'FIREBASE_PROJECT_ID',
      'learning-management-syst-3cc3a',
    );
    const location = this.configService.get<string>(
      'FDC_LOCATION',
      'europe-west8',
    );
    const serviceId = this.configService.get<string>(
      'FDC_SERVICE_ID',
      'learning-management-syst-3cc3a-service',
    );
    const connectorId = this.configService.get<string>(
      'FDC_CONNECTOR_ID',
      'default',
    );

    // Use the single FIREBASE_EMULATOR_LOCAL toggle. When true, point all
    // Data Connect requests at the local emulator; otherwise use the cloud.
    this.isEmulator =
      this.configService.get<string>('FIREBASE_EMULATOR_LOCAL', 'false')
        ?.toLowerCase() === 'true';

    if (this.isEmulator) {
      const emulatorHost = this.configService.get<string>(
        'FDC_EMULATOR_HOST',
        'http://127.0.0.1:9399',
      );
      const base = emulatorHost.replace(/\/+$/, '');
      this.serviceBaseUrl = `${base}/v1beta/projects/${projectId}/locations/${location}/services/${serviceId}`;
      this.baseUrl = `${this.serviceBaseUrl}/connectors/${connectorId}`;
      this.logger.log( `Data Connect emulator detected — using ${this.baseUrl}`, );
    } else {
      this.serviceBaseUrl = `https://firebasedataconnect.googleapis.com/v1beta/projects/${projectId}/locations/${location}/services/${serviceId}`;
      this.baseUrl = `${this.serviceBaseUrl}/connectors/${connectorId}`;
    }

    this.apiKey = this.configService.get<string>('FIREBASE_API_KEY', '');
    this.timeoutMs = Number(
      this.configService.get<string>('FDC_TIMEOUT_MS', '15000'),
    );

    if (!this.apiKey && !this.isEmulator) {
      this.logger.warn(
        'FIREBASE_API_KEY is not set — Data Connect requests will be rejected by the API.',
      );
    }
  }

  /**
   * Execute a named query operation against Firebase Data Connect.
   */
  async executeQuery<T = any>(
    operationName: string,
    variables?: Record<string, any>,
    authToken?: string,
  ): Promise<T> {
    return this.execute<T>('executeQuery', operationName, variables, authToken);
  }

  /**
   * Execute a named mutation operation against Firebase Data Connect.
   */
  async executeMutation<T = any>(
    operationName: string,
    variables?: Record<string, any>,
    authToken?: string,
  ): Promise<T> {
    return this.execute<T>(
      'executeMutation',
      operationName,
      variables,
      authToken,
    );
  }

  /**
   * Execute a query with the backend's service-account credential instead of an
   * end-user token. Runs with admin privileges and no auth.uid — use only for
   * trusted, server-initiated work (e.g. the quiz expiry cron). Never expose an
   * admin-executed operation to a request whose role hasn't been verified.
   */
  async executeQueryAsAdmin<T = any>(
    operationName: string,
    variables?: Record<string, any>,
  ): Promise<T> {
    return this.execute<T>(
      'executeQuery',
      operationName,
      variables,
      undefined,
      true,
    );
  }

  /** Mutation counterpart of {@link executeQueryAsAdmin}. */
  async executeMutationAsAdmin<T = any>(
    operationName: string,
    variables?: Record<string, any>,
  ): Promise<T> {
    return this.execute<T>(
      'executeMutation',
      operationName,
      variables,
      undefined,
      true,
    );
  }

  /**
   * Internal method to execute FDC operations via REST API.
   */
  private async execute<T>(
    action: 'executeQuery' | 'executeMutation',
    operationName: string,
    variables?: Record<string, any>,
    authToken?: string,
    useAdmin = false,
  ): Promise<T> {
    // Admin operations must bypass @auth, which the connector endpoints can't do.
    // Route registered ones to the service-level :executeGraphql admin endpoint;
    // anything else falls through to the connector path unchanged.
    //
    // FORCE_ADMIN_OPERATIONS are privileged authoring ops that are @auth(level:
    // NO_ACCESS) in the connector (so the client SDK can't call them). Services
    // still invoke them via the ordinary executeQuery/executeMutation with a user
    // token AFTER the NestJS ownership guards pass; we auto-route them to the
    // admin path here so they actually execute. A forced op MUST have a body in
    // ADMIN_OPERATIONS — fail loudly rather than silently hit the connector (which
    // would reject it) if that invariant is ever broken.
    const forceAdmin = FORCE_ADMIN_OPERATIONS.has(operationName);
    if (forceAdmin && !ADMIN_OPERATIONS[operationName]) {
      throw new Error(
        `Operation "${operationName}" is force-admin but missing from ADMIN_OPERATIONS`,
      );
    }
    if ((useAdmin || forceAdmin) && ADMIN_OPERATIONS[operationName]) {
      return this.executeAdminGraphql<T>(operationName, variables);
    }

    const url = `${this.baseUrl}:${action}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (useAdmin) {
      // Privileged server-to-server call: authenticate with the service-account
      // OAuth token. The request runs as admin (no auth.uid).
      const adminToken = await this.firebaseService.getAdminAccessToken();
      headers['Authorization'] = `Bearer ${adminToken}`;
    } else if (authToken) {
      // Use Firebase Auth token for user-level operations
      headers['x-firebase-auth-token'] = authToken;
    }

    // Add API key if available
    if (this.apiKey) {
      headers['x-goog-api-key'] = this.apiKey;
    }

    const body = {
      operationName,
      variables: variables ?? {},
    };

    this.logger.debug(
      `FDC ${action}: ${operationName} with vars: ${JSON.stringify(variables)}`,
    );

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (err: any) {
      if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
        this.logger.error(`FDC ${action} timed out for ${operationName}`);
        throw new GatewayTimeoutException(
          `Data Connect operation "${operationName}" timed out`,
        );
      }
      this.logger.error(
        `FDC ${action} network error for ${operationName}: ${err?.message}`,
      );
      throw new BadGatewayException(
        `Data Connect operation "${operationName}" could not be reached`,
      );
    }

    if (!response.ok) {
      const errorBody = await response.text();
      // Log full upstream detail server-side; never surface schema/SQL internals
      // to the client (M7 — information disclosure).
      this.logger.error(
        `FDC ${action} failed for ${operationName}: ${response.status} ${errorBody}`,
      );
      throw new HttpException(
        `Data Connect operation "${operationName}" failed`,
        this.mapStatus(response.status),
      );
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      this.logger.error(
        `FDC ${action} errors for ${operationName}: ${JSON.stringify(result.errors)}`,
      );
      throw new HttpException(
        `Data Connect operation "${operationName}" returned errors`,
        this.mapGraphqlErrorStatus(result.errors),
      );
    }

    return result.data as T;
  }

  /**
   * Execute a privileged operation via the service-level `:executeGraphql`
   * endpoint. This runs with the service-account's admin credentials and
   * bypasses `@auth` — the only way to run NO_ACCESS / admin-only operations.
   * Sends the raw GraphQL from {@link ADMIN_OPERATIONS} (executeGraphql does not
   * accept connector operation *names*).
   */
  private async executeAdminGraphql<T>(
    operationName: string,
    variables?: Record<string, any>,
  ): Promise<T> {
    const query = ADMIN_OPERATIONS[operationName];
    const url = `${this.serviceBaseUrl}:executeGraphql`;

    const adminToken = await this.firebaseService.getAdminAccessToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    };

    this.logger.debug(`FDC admin executeGraphql: ${operationName}`);

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          operationName,
          variables: variables ?? {},
        }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (err: any) {
      if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
        this.logger.error(
          `FDC admin executeGraphql timed out for ${operationName}`,
        );
        throw new GatewayTimeoutException(
          `Data Connect admin operation "${operationName}" timed out`,
        );
      }
      this.logger.error(
        `FDC admin executeGraphql network error for ${operationName}: ${err?.message}`,
      );
      throw new BadGatewayException(
        `Data Connect admin operation "${operationName}" could not be reached`,
      );
    }

    if (!response.ok) {
      const errorBody = await response.text();
      this.logger.error(
        `FDC admin executeGraphql failed for ${operationName}: ${response.status} ${errorBody}`,
      );
      throw new HttpException(
        `Data Connect admin operation "${operationName}" failed`,
        this.mapStatus(response.status),
      );
    }

    const result = await response.json();
    if (result.errors && result.errors.length > 0) {
      this.logger.error(
        `FDC admin executeGraphql errors for ${operationName}: ${JSON.stringify(result.errors)}`,
      );
      throw new HttpException(
        `Data Connect admin operation "${operationName}" returned errors`,
        this.mapGraphqlErrorStatus(result.errors),
      );
    }

    return result.data as T;
  }

  /**
   * Map an upstream HTTP status to the status this API should return.
   * Client errors (4xx) are passed through; everything else is a bad gateway,
   * since the failure originated in the upstream Data Connect service.
   */
  private mapStatus(upstreamStatus: number): number {
    switch (upstreamStatus) {
      case HttpStatus.BAD_REQUEST:
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.FORBIDDEN:
      case HttpStatus.NOT_FOUND:
      case HttpStatus.CONFLICT:
        return upstreamStatus;
      default:
        return HttpStatus.BAD_GATEWAY;
    }
  }

  /**
   * Inspect GraphQL error codes (returned with HTTP 200) and map common
   * auth/validation failures to appropriate HTTP statuses.
   */
  private mapGraphqlErrorStatus(errors: any[]): number {
    const codes = errors
      .map((e) => e?.extensions?.code ?? e?.code)
      .filter(Boolean)
      .map((c: string) => String(c).toUpperCase());

    if (codes.includes('UNAUTHENTICATED')) return HttpStatus.UNAUTHORIZED;
    if (codes.includes('PERMISSION_DENIED')) return HttpStatus.FORBIDDEN;
    if (codes.includes('NOT_FOUND')) return HttpStatus.NOT_FOUND;
    if (
      codes.includes('INVALID_ARGUMENT') ||
      codes.includes('FAILED_PRECONDITION')
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.BAD_GATEWAY;
  }

  /**
   * Extract the Bearer token from the request for forwarding to FDC.
   * Safe to call from guarded routes — FirebaseAuthGuard guarantees the token exists.
   */
  extractToken(request: any): string {
    return extractBearerToken(request);
  }
}
