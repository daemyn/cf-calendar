import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidBookedDate(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidBookedDate',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: 'Time must start at a full hour',
      },
      validator: {
        validate(value: any) {
          const d = new Date(value);
          return (
            d.getMinutes() === 0 &&
            d.getSeconds() === 0 &&
            d.getMilliseconds() === 0
          );
        },
      },
    });
  };
}
