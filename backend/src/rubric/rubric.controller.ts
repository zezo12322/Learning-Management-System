import {
  Controller,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
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
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('missions/:missionId/rubric')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class RubricController {
  constructor(private readonly rubricService: RubricService) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateCriterionDto,
    @AuthToken() token: string,
  ) {
    return this.rubricService.create(missionId, dto, token);
  }

  @Patch(':criterionId')
  @OwnsResource('criterion')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('criterionId') criterionId: string,
    @Body() dto: UpdateCriterionDto,
    @AuthToken() token: string,
  ) {
    return this.rubricService.update(criterionId, dto, token);
  }

  @Delete(':criterionId')
  @OwnsResource('criterion')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('criterionId') criterionId: string,
    @AuthToken() token: string,
  ) {
    return this.rubricService.delete(missionId, criterionId, token);
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @AuthToken() token: string,
  ) {
    return this.rubricService.reorder(missionId, dto.orderedIds, token);
  }
}
