import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Header,
  Ip,
  Req,
  UseGuards,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class StreamingController {
  constructor(private readonly streaming: StreamingService) {}

  /**
   * Returns a rewritten, enrollment-gated HLS playlist. Segment URLs are
   * short-lived signed GCS URLs and the key URL points back at /stream/key.
   * `v` selects a variant/sub-playlist for adaptive-bitrate masters.
   */
  @Get('lectures/:lectureId/stream/manifest')
  @Header('Content-Type', 'application/vnd.apple.mpegurl')
  @Header('Cache-Control', 'no-store')
  manifest(
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @CurrentUser('admin') isAdmin: boolean,
    @Ip() ip: string,
    @Query('v') variant?: string,
    @Req() req?: any,
  ) {
    return this.streaming.getManifest({
      lectureId,
      uid,
      token,
      isAdmin: isAdmin === true,
      variant,
      ip,
      userAgent: req?.headers?.['user-agent'],
    });
  }

  /**
   * Signed forensic watermark for the player to overlay (user identity + time).
   * Enrollment-gated. Deters/traces leaks; does not block recording.
   */
  @Get('lectures/:lectureId/stream/watermark')
  @Header('Cache-Control', 'no-store')
  watermark(
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @CurrentUser('email') email: string,
    @CurrentUser('admin') isAdmin: boolean,
    @Ip() ip: string,
    @Req() req: any,
  ) {
    return this.streaming.getWatermark(
      lectureId,
      uid,
      email ?? null,
      token,
      isAdmin === true,
      ip,
      req.headers?.['user-agent'],
    );
  }

  /**
   * Returns the raw 16-byte AES-128 content key, gated by Firebase auth +
   * enrollment + a bound, expiring key token (`kt`).
   */
  @Get('lectures/:lectureId/stream/key')
  @Header('Content-Type', 'application/octet-stream')
  @Header('Cache-Control', 'no-store')
  async key(
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @CurrentUser('admin') isAdmin: boolean,
    @Ip() ip: string,
    @Query('kt') kt?: string,
    @Req() req?: any,
  ): Promise<StreamableFile> {
    if (!kt) {
      throw new BadRequestException('Missing key token');
    }
    const key = await this.streaming.getKey(
      lectureId,
      uid,
      token,
      isAdmin === true,
      kt,
      ip,
      req?.headers?.['user-agent'],
    );
    // Wrap in StreamableFile so Nest sends the raw 16 bytes; returning a bare
    // Buffer makes Nest JSON-serialize it ({"type":"Buffer",...}), which breaks
    // HLS decryption.
    return new StreamableFile(key, { type: 'application/octet-stream' });
  }

  /**
   * Admin/instructor: register uploaded HLS assets for a lecture (sets videoUrl
   * to the master playlist after verifying the playlist + key exist).
   */
  @Post('courses/:courseId/lectures/:lectureId/stream/register')
  @UseGuards(RolesGuard, ResourceOwnershipGuard)
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  register(
    @Param('courseId') courseId: string,
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
  ) {
    return this.streaming.registerHls(courseId, lectureId, token);
  }
}
