import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  BadGatewayException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service for executing GraphQL operations against Firebase Data Connect.
 * Uses the connector REST API endpoint, forwarding the caller's Firebase ID
 * token so that `@auth(level: USER)` operations resolve `auth.uid` correctly.
 */
@Injectable()
export class DataConnectService {
  private readonly logger = new Logger(DataConnectService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID', 'learning-management-syst-3cc3a');
    const location = this.configService.get<string>('FDC_LOCATION', 'europe-west8');
    const serviceId = this.configService.get<string>('FDC_SERVICE_ID', 'learning-management-syst-3cc3a-service');
    const connectorId = this.configService.get<string>('FDC_CONNECTOR_ID', 'default');

    this.baseUrl = `https://firebasedataconnect.googleapis.com/v1beta/projects/${projectId}/locations/${location}/services/${serviceId}/connectors/${connectorId}`;
    this.apiKey = this.configService.get<string>('FIREBASE_API_KEY', '');
    this.timeoutMs = Number(this.configService.get<string>('FDC_TIMEOUT_MS', '15000'));

    if (!this.apiKey) {
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
    return this.execute<T>('executeMutation', operationName, variables, authToken);
  }

  /**
   * Internal method to execute FDC operations via REST API.
   */
  private async execute<T>(
    action: 'executeQuery' | 'executeMutation',
    operationName: string,
    variables?: Record<string, any>,
    authToken?: string,
  ): Promise<T> {
    const url = `${this.baseUrl}:${action}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Use Firebase Auth token for user-level operations
    if (authToken) {
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
      this.logger.error(
        `FDC ${action} failed for ${operationName}: ${response.status} ${errorBody}`,
      );
      throw new HttpException(
        `Data Connect operation "${operationName}" failed: ${errorBody}`,
        this.mapStatus(response.status),
      );
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      this.logger.error(
        `FDC ${action} errors for ${operationName}: ${JSON.stringify(result.errors)}`,
      );
      throw new HttpException(
        `Data Connect operation "${operationName}" returned errors: ${JSON.stringify(result.errors)}`,
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
    const authHeader = request.headers?.['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split('Bearer ')[1];
    }
    return '';
  }
}

