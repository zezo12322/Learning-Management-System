import { IsIn } from 'class-validator';
import type { AppRole } from '../../common/decorators/roles.decorator';

const APP_ROLES: AppRole[] = ['admin', 'instructor', 'student'];

export class SetRoleDto {
  @IsIn(APP_ROLES, {
    message: 'role must be one of: admin, instructor, student',
  })
  role: AppRole;
}
