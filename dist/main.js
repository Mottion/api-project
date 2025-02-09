"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_exception_filter_1 = require("./filters/prisma-exception.filter");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swagger_1 = require("./swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    const specs = swaggerJsdoc(swagger_1.swaggerConfig);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
    const port = 3000;
    await app.listen(port);
    console.log(`Listen at: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map