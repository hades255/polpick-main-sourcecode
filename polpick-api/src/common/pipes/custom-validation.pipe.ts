import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

export class ApiValidationPipe extends ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                try {
                    return new BadRequestException({
                        message: validationErrors[0].constraints[Object.keys(validationErrors[0].constraints)[0]],
                        statusCode: 400,
                        error: 'Bad Request'
                    });
                } catch (error) {
                    return new BadRequestException({
                        message: error.message,
                        statusCode: 500,
                        error: 'Something went wrong!'
                    })
                }
            },
        });
    }
}