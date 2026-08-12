import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { SyncUserDto, UpdateProfileDto } from './dto/user.dto';

/**
 * User provisioning & profile (M9). `SyncUser` must be called on first
 * authenticated use so a `users` row exists before the caller authors courses /
 * missions (whose author/createdBy columns FK to users.uid).
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async sync(dto: SyncUserDto, authToken: string) {
    // Get the user's UID from the auth token
    const uid = await this.extractUidFromToken(authToken);

    // Check if the user needs to accept ToS
    const needsAcceptance = await this.checkToSStatus(uid, authToken);

    // If ToS is required but user hasn't accepted the current version, throw error
    if (needsAcceptance) {
      throw new NotFoundException(
        'Please accept the current Terms of Service before continuing. Use POST /me/tos/accept endpoint.',
      );
    }

    return this.dc.executeMutation(
      'SyncUser',
      { email: dto.email, name: dto.name, avatar: dto.avatar ?? null },
      authToken,
    );
  }

  async getMe(authToken: string) {
    const data = await this.dc.executeQuery('GetMe', {}, authToken);
    return data?.user ?? null;
  }

  async updateProfile(dto: UpdateProfileDto, authToken: string) {
    return this.dc.executeMutation(
      'UpdateMyProfile',
      {
        bio: dto.bio ?? null,
        company: dto.company ?? null,
        phone: dto.phone ?? null,
        preferences: dto.preferences ?? null,
      },
      authToken,
    );
  }

  /**
   * Extract the UID from the Firebase ID token
   * Using Firebase Admin SDK to verify and decode the token
   */
  private async extractUidFromToken(token: string): Promise<string> {
    try {
      const auth = this.firebaseService.getAuth();
      const decodedToken = await auth.verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      throw new Error('Could not extract UID from token: ' + error.message, {
        cause: error,
      });
    }
  }

  /**
   * Check if the user needs to accept the current Terms of Service
   * Returns true if user needs to accept, false if already accepted or no ToS exists
   */
  private async checkToSStatus(uid: string, token: string): Promise<boolean> {
    try {
      // Get user's accepted ToS
      const userData = await this.dc.executeQuery('GetUserToSStatus', { uid });
      const user = userData?.user;

      // Get current ToS
      const currentTos = await this.getCurrentToS();

      // If no ToS exists, user doesn't need to accept anything
      if (!currentTos) {
        return false;
      }

      // Compare - if user's acceptedToSId doesn't match current ToS ID, they need to accept
      const acceptedTosId = user?.acceptedTosId;
      return acceptedTosId !== currentTos.id;
    } catch (error) {
      // If ToS check fails for any reason, allow the sync to proceed
      // This prevents blocking users if there's a database or ToS service issue
      console.warn(
        'ToS check failed, allowing sync to proceed:',
        error.message,
      );
      return false;
    }
  }

  /**
   * Get the current Terms of Service
   */
  private async getCurrentToS() {
    try {
      const data = await this.dc.executeQuery('GetCurrentToS');
      return data?.tosVersions?.[0] ?? null;
    } catch (error) {
      return null;
    }
  }
}
