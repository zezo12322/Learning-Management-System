import { AiController } from './ai.controller';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';

describe('AiController', () => {
  describe('generate', () => {
    it('should be guarded exactly like retry', () => {
      const generateGuards = Reflect.getMetadata(
        '__guards__',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        AiController.prototype.generate,
      );
      expect(generateGuards).toContain(RolesGuard);
      expect(generateGuards).toContain(ResourceOwnershipGuard);

      const generateRoles = Reflect.getMetadata(
        'roles',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        AiController.prototype.generate,
      );
      expect(generateRoles).toEqual(['admin', 'instructor']);

      const generateResource = Reflect.getMetadata(
        'owns_resource',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        AiController.prototype.generate,
      );
      expect(generateResource).toEqual({ type: 'lecture', param: 'lectureId' });
    });
  });
});
