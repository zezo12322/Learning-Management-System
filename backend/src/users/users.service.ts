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
