import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import aiRoutes from './modules/ai/routes.js';
import authRoutes from './modules/auth/routes.js';
import projectRoutes from './modules/project/routes.js';
import taskRoutes from './modules/task/routes.js';
import { swaggerUi, specs } from './docs/swagger.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.json({ message: 'SmastSaas API Running' });
});

export default app;