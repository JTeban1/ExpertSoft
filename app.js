/**
 * Main application entry point for the CrudClinic API server.
 * Sets up Express, routes, middleware, and starts the server.
 * @module app
 */
import express from 'express';
import path from 'path';
import billsRoutes from './app/routes/billsRouter.js';
import csvRoutes from './app/routes/csvRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());
// app.use(cors());


/**
 * Get current file and directory name for static file serving.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * Serve static files from the 'public' directory.
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/bills', billsRoutes);
app.use('/api/file', csvRoutes);

const PORT = process.env.PORT || 3043;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});