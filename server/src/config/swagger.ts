import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tontine API',
      version: '1.0.0',
      description: 'API documentation for Tontine application',
    },
    servers: [
      {
        url: 'http://localhost:3003/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.ts'], // chemins des fichiers contenant les annotations
};

export const swaggerSpec = swaggerJsdoc(options);