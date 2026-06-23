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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions/:missionId/rubric')
@UseGuards(FirebaseAuthGuard)
export class RubricController {
  constructor(
    private readonly rubricService: RubricService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateCriterionDto,
    @Req() req: any,
  ) {
    return this.rubricService.create(missionId, dto, this.dc.extractToken(req));
  }

  @Patch(':criterionId')
  update(
    @Param('criterionId') criterionId: string,
    @Body() dto: UpdateCriterionDto,
    @Req() req: any,
  ) {
    return this.rubricService.update(criterionId, dto, this.dc.extractToken(req));
  }

  @Delete(':criterionId')
  delete(
    @Param('missionId') missionId: string,
    @Param('criterionId') criterionId: string,
    @Req() req: any,
  ) {
    return this.rubricService.delete(missionId, criterionId, this.dc.extractToken(req));
  }

  @Put('reorder')
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.rubricService.reorder(missionId, dto.orderedIds, this.dc.extractToken(req));
  }
}
