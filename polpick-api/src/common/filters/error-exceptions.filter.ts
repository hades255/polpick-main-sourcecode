import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    UnauthorizedException} from "@nestjs/common";
import { Response } from "express";

@Catch()
export default class ServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {

        let ctx = host.switchToHttp();
        let res: Response = ctx.getResponse();

        if(exception instanceof UnauthorizedException) {
            return res
                .status(exception.getStatus())
                .send({ message: 'Unauthorized!', statusCode: HttpStatus.UNAUTHORIZED, auth: false })
        } else if (exception instanceof HttpException) {
            return res
                .status(exception.getStatus())
                .send(exception.getResponse())
        } else {
            return res
                .status(500)
                .send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: exception?.message || exception });
        }
    }
}
