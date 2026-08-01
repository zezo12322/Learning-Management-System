import { Controller, Get, Post, Patch, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { SyncUserDto, UpdateProfileDto } from './dto/user.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';

/**
 * Self-service identity endpoints for the authenticated user. No role required
 * beyond being signed in — every authenticated principal may manage their own
 * record/profile (M9).
 */
@Controller('me')
@UseGuards(FirebaseAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Strict rate limit: 5 sync requests per 60 seconds (brute-force protection).
  @Post('sync')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async sync(@Body() dto: SyncUserDto, @AuthToken() token: string) {
    // Phase 3: Egyptian legal compliance - ToS acceptance validation
    // If acceptedToS is provided, it must be true
    if (dto.acceptedToS !== undefined && dto.acceptedToS !== true) {
      throw new BadRequestException(
        'Terms of Service acceptance is required. Please accept the ToS before registering.',
      );
    }

    return this.usersService.sync(dto, token);
  }

  @Get()
  getMe(@AuthToken() token: string) {
    return this.usersService.getMe(token);
  }

  @Patch('profile')
  updateProfile(@Body() dto: UpdateProfileDto, @AuthToken() token: string) {
    return this.usersService.updateProfile(dto, token);
  }
}
