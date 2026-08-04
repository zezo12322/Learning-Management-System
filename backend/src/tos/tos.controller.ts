import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { ToSService } from './tos.service';
import { CreateToSDto, UpdateToSDto } from './dto/tos.dto';

/**
 * Admin ToS management controller.
 * Handles creation, publishing, and management of Terms of Service versions.
 */
@Controller('admin/tos')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin')
export class ToSController {
  constructor(private readonly tosService: ToSService) {}

  @Post()
  create(@Body() dto: CreateToSDto, @Request() req) {
    return this.tosService.create(dto, req.user?.uid);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.tosService.publish(id);
  }

  @Get()
  getAll() {
    return this.tosService.getAll();
  }

  @Get('current')
  getCurrent() {
    return this.tosService.getCurrent();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tosService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateToSDto) {
    return this.tosService.update(id, dto);
  }
}

/**
 * Public ToS controller.
 * Provides read-only access to current and historical ToS for frontend consumption.
 */
@Controller('tos')
export class PublicToSController {
  constructor(private readonly tosService: ToSService) {}

  @Get('current')
  getCurrentPublic() {
    return this.tosService.getCurrent();
  }

  @Get('history')
  getHistory() {
    return this.tosService.getAll();
  }
}

/**
 * User ToS controller.
 * Handles user acceptance and status checking for Terms of Service.
 */
@Controller('me/tos')
@UseGuards(FirebaseAuthGuard)
export class UserToSController {
  constructor(private readonly tosService: ToSService) {}

  @Post('accept')
  accept(@AuthToken() token: string, @Request() req) {
    return this.tosService.acceptCurrent(token, req.user?.uid);
  }

  @Get('status')
  getStatus(@AuthToken() token: string, @Request() req) {
    return this.tosService.getStatus(token, req.user?.uid);
  }
}
