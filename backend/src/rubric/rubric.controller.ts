import {
  Controller,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RubricService } from './rubric.service';
import { CreateCriterionDto, UpdateCriterionDto } from './dto/criterion.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions/:missionId/rubric')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class RubricController {
  constructor(
    private readonly rubricService: RubricService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateCriterionDto,
    @Req() req: any,
  ) {
    return this.rubricService.create(missionId, dto, this.dc.extractToken(req));
  }

  @Patch(':criterionId')
  @OwnsResource('criterion')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('criterionId') criterionId: string,
    @Body() dto: UpdateCriterionDto,
    @Req() req: any,
  ) {
    return this.rubricService.update(criterionId, dto, this.dc.extractToken(req));
  }

  @Delete(':criterionId')
  @OwnsResource('criterion')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('criterionId') criterionId: string,
    @Req() req: any,
  ) {
    return this.rubricService.delete(missionId, criterionId, this.dc.extractToken(req));
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.rubricService.reorder(missionId, dto.orderedIds, this.dc.extractToken(req));
  }
}
