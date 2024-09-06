import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersDocument } from './users/schemas/users.schema';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as compression from 'compression';
import { UtilsService } from './helpers/utils.helper';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from "@nestjs/platform-socket.io";
import ServerErrorExceptionFilter from './common/filters/error-exceptions.filter';
import { ApiValidationPipe } from './common/pipes/custom-validation.pipe';

/* Declare Additional Type For Request Object */
declare module 'express-serve-static-core' {
  export interface Request {
    user?: UsersDocument
  }
}

/* NestJS Main Function */
async function main() {
  try {
    global.socketIo = null;
    global.btcPrice = 0;
    global.tradeUsers = [];
    global.tradeUsersTwo = [];
    global.botEncounter = 0;

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useWebSocketAdapter(new IoAdapter(app));
    const logger = app.get<Logger>(Logger);
    const configService = app.get<ConfigService>(ConfigService);

    /* Initialize Global Variables */
    global.moment = require('moment');
    global._ = require('underscore');
    global.project_description = configService.get('PROJECT_DESCRIPTION');
    global.project_name = configService.get('PROJECT_NAME');
    global.utils = app.get<UtilsService>(UtilsService);

    /* Pipes, Middlewares, Static & Views Folders */
    app.useGlobalPipes(new ApiValidationPipe());
    app.useGlobalFilters(new ServerErrorExceptionFilter());

    app.use(cors());
    app.use(compression());
    app.useStaticAssets('./public');

    /* Middleware For Header Configurations */
    app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.header('Cache-Control', 'private, no-cache, max-age=3600');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');

      /* Set x-access-token inside the headers.token variable */
      (req.headers['x-access-token'] && req.headers['x-access-token'] != null) && (req.headers['token'] = req.headers['x-access-token']);
      next();
    });


    /* Swagger Setup */
    const config = new DocumentBuilder()
      .addSecurity('x-access-token', { type: 'apiKey', name: 'x-access-token', in: 'header' })
      .setTitle(configService.get('PROJECT_NAME') + ' APIDOC')
      .setDescription(configService.get('PROJECT_NAME') + ' API Documentations')
      .setVersion('0.0.1')
      .addServer(configService.get('PROD_SERVER_BASE_URL'), 'Production Server')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidoc', app, document);
    SwaggerModule.setup('/', app, document);


    await app.listen(configService.get('PORT'), () => {
      logger.debug(`Server is running on http://127.0.0.1:${configService.get('PORT')}`)
    });
  } catch (error) {
    console.error(error);
  }
}
main();