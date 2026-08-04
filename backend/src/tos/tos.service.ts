import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateToSDto, UpdateToSDto } from './dto/tos.dto';

/**
 * ToS Service - Handles Terms of Service versioning and user acceptance.
 * ToS versions are created in draft mode and must be explicitly published
 * to become active. Once published, a ToS version becomes immutable.
 */
@Injectable()
export class ToSService {
  constructor(private readonly dc: DataConnectService) {}

  async create(dto: CreateToSDto, createdById: string) {
    return this.dc.executeMutation('CreateToS', {
      version: dto.version,
      title: dto.title,
      documentUrl: dto.documentUrl,
      effectiveDate: dto.effectiveDate || null,
    });
  }

  async publish(tosId: string) {
    return this.dc.executeMutation('PublishToS', { tosId });
  }

  async update(tosId: string, dto: UpdateToSDto) {
    const variables: any = { tosId };
    if (dto.version !== undefined) variables.version = dto.version;
    if (dto.title !== undefined) variables.title = dto.title;
    if (dto.documentUrl !== undefined) variables.documentUrl = dto.documentUrl;
    if (dto.effectiveDate !== undefined)
      variables.effectiveDate = dto.effectiveDate;

    return this.dc.executeMutation('UpdateToS', variables);
  }

  async getById(tosId: string) {
    return this.dc.executeQuery('GetToSById', { tosId });
  }

  async getAll() {
    return this.dc.executeQuery('GetAllToS');
  }

  async getCurrent() {
    const data = await this.dc.executeQuery('GetCurrentToS');
    return data?.tosVersions?.[0] ?? null;
  }

  /**
   * Accept the current Terms of Service for the authenticated user.
   * Backend automatically uses the current ToS - no body needed from frontend.
   */
  async acceptCurrent(token: string, uid: string) {
    // Get current ToS
    const currentTos = await this.getCurrent();
    if (!currentTos) {
      throw new NotFoundException('No Terms of Service available');
    }

    // Update user with current ToS ID and timestamp
    return this.dc.executeMutation(
      'AcceptCurrentToS',
      { tosId: currentTos.id },
      token,
    );
  }

  /**
   * Get the user's ToS acceptance status.
   * Compares the user's accepted ToS ID with the current ToS ID.
   */
  async getStatus(token: string, uid: string) {
    // Get user's accepted ToS
    const userData = await this.dc.executeQuery('GetUserToSStatus', { uid });
    const user = userData?.user;

    // Get current ToS
    const currentTos = await this.getCurrent();
    if (!currentTos) {
      throw new NotFoundException('No Terms of Service available');
    }

    // Compare - if user's acceptedToSId doesn't match current ToS ID, they need to accept
    const acceptedTosId = user?.acceptedTosId;
    const needsAcceptance = acceptedTosId !== currentTos.id;

    return {
      needsAcceptance,
      acceptedAt: user?.tosAcceptedAt,
      current: {
        id: currentTos.id,
        version: currentTos.version,
        title: currentTos.title,
        documentUrl: currentTos.documentUrl,
      },
    };
  }
}
