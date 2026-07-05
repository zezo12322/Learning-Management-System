import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Drop-in replacement for class-validator's @IsUUID() that also accepts the
 * compact 32-hex-char format returned by Firebase Data Connect.
 *
 * Accepts:
 *   - Standard:  `550e8400-e29b-41d4-a716-446655440000`
 *   - Compact:   `550e8400e29b41d4a716446655440000`
 */
export function IsFlexUUID(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFlexUUID',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          // standard UUID with dashes
          const dashed =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          // compact 32-char hex
          const compact = /^[0-9a-f]{32}$/i;
          return dashed.test(value) || compact.test(value);
        },
        defaultMessage() {
          return `${propertyName} must be a valid UUID (with or without dashes)`;
        },
      },
    });
  };
}
