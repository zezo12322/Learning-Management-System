import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { SyncUserDto, UpdateProfileDto } from './dto/user.dto';

/**
 * User provisioning & profile (M9). `SyncUser` must be called on first
 * authenticated use so a `users` row exists before the caller authors courses /
 * missions (whose author/createdBy columns FK to users.uid).
 */
@Injectable()
export class UsersService {
  constructor(private readonly dc: DataConnectService) {}

  /**
   * Provisioning is deliberately NOT gated on ToS acceptance.
   *
   * This call is what creates the `users` row, and acceptance is recorded ON
   * that row (`AcceptCurrentToS` is a `user_update` keyed by `auth.uid`).
   * Gating it therefore deadlocks every new signup: sync is refused until the
   * user accepts, acceptance updates a row that does not exist yet, so the
   * refusal is permanent and no amount of seeded data clears it.
   *
   * Acceptance is enforced after provisioning instead — see TosGuard and the
   * web acceptance gate.
   */
  async sync(dto: SyncUserDto, authToken: string) {
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
}
