import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import {
  UpsertCourseRatingDto,
  ListCourseRatingsQueryDto,
} from './dto/rating.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

/**
 * Course ratings & reviews.
 *
 * The list/summary endpoints are public (course pages show reviews to anyone),
 * so — like CatalogController — there is no controller-level guard; auth is
 * applied per-method only where a user identity is required (their own rating).
 */
@Controller('courses/:courseId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // ---- Public: anyone can read a course's reviews / aggregate score ----

  @Get()
  list(
    @Param('courseId') courseId: string,
    @Query() query: ListCourseRatingsQueryDto,
  ) {
    return this.ratingsService.listRatings(courseId, query);
  }

  @Get('summary')
  summary(@Param('courseId') courseId: string) {
    return this.ratingsService.getSummary(courseId);
  }

  // ---- Authenticated: the caller's own rating (create / edit / read / remove) ----

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  getMine(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.ratingsService.getMyRating(courseId, token);
  }

  @Put('me')
  @UseGuards(FirebaseAuthGuard)
  upsert(
    @Param('courseId') courseId: string,
    @Body() dto: UpsertCourseRatingDto,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.ratingsService.upsertRating(courseId, dto, token, uid);
  }

  @Delete('me')
  @UseGuards(FirebaseAuthGuard)
  remove(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.ratingsService.deleteRating(courseId, token, uid);
  }
}
