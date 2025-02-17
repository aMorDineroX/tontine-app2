import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { 
  rateLimiter, 
  securityHeaders, 
  corsOptions, 
  preventParamPollution 
} from './middleware/security.middleware';
import { errorHandler } from './middleware/error.middleware';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import tontineRoutes from './routes/tontine.routes';
import { authenticateToken } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3003;

// Middleware de sécurité
app.use(securityHeaders);
app.use(corsOptions);
app.use(rateLimiter);
app.use(preventParamPollution);
app.use(express.json({ limit: '10kb' })); // Limite la taille des requêtes

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tontines', authenticateToken, tontineRoutes);

// Gestion des erreurs
app.use(errorHandler);

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} non trouvée`
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch(console.error);

export default app;
