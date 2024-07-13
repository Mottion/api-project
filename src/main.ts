import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import * as swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaExceptionFilter());
  
  const specs = swaggerJsdoc(swaggerConfig);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

  const port = 3000
  await app.listen(port);
  console.log(`Listen at: http://localhost:${port}`)
}
bootstrap();
