"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Project API",
            description: "Endpoints da aplicação Teste",
            version: "1.0.0",
        },
        host: "localhost:3000",
        tags: [],
        components: {
            securitySchemes: {
                BearerAuth: {
                    in: "header",
                    type: "http",
                    scheme: "bearer",
                },
            },
        },
    },
    apis: ["src/docs/*.yaml"],
};
//# sourceMappingURL=swagger.js.map