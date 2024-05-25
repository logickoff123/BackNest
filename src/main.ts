import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RoleService } from './role/role.service';
import { UsersService } from './users/users.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin : ['http://localhost:3000','http://localhost:7777'],allowedHeaders:['*']});
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const roleService = app.get(RoleService);
  const useradmin = app.get(UsersService);

  const tableExists = await roleService.checkTableExists(); // создание роли
  if (!tableExists) {
    await roleService.createRoles();
    await useradmin.createadmin();
  }

  const config = new DocumentBuilder()
    .setTitle('School X - OpenAPI 3.0')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  const port = parseInt(process.env.PORT);
  console.log('port = ', process.env.PORT);
  const server = process.env.SERVER;
  await app.listen(port, server);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
