import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
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