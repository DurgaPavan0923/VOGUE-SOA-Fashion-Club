import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

import { ENV } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import achievementRoutes from './routes/achievement.routes.js';
import eventRoutes from './routes/event.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import themeRoutes from './routes/theme.routes.js';
import memberRoutes from './routes/member.routes.js';
import applicationRoutes from './routes/application.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

// Logging & Parsing
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Media Folder for Local Uploads
if (!fs.existsSync(ENV.UPLOAD_DIR)) {
  fs.mkdirSync(ENV.UPLOAD_DIR, { recursive: true });
}
app.use('/uploads', express.static(ENV.UPLOAD_DIR));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    club: 'VOGUE - SOA Fashion Club',
    university: 'SOA University, Bhubaneswar',
    tagline: 'More Than Fashion. A Movement.',
    credits: 'Website crafted by GDGoC ITER',
    timestamp: new Date().toISOString(),
  });
});

// Production: Resilient Client Single-Page App Static Server
const potentialDistPaths = [
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(__dirname, '../client/dist'),
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../../../client/dist'),
];

let clientDistPath = potentialDistPaths.find((p) => fs.existsSync(p));

if (clientDistPath) {
  console.log(`[VOGUE Server] Serving static client build from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath!, 'index.html'));
  });
} else {
  console.warn('[VOGUE Server] client/dist not found. Running in API-only mode.');
}

// Global Error Handler
app.use(errorHandler);

// Start Server (when running standalone or local daemon)
if (!process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`
  ══════════════════════════════════════════════════════════
  ✦ VOGUE – SOA Fashion Club Web Server ✦
  ══════════════════════════════════════════════════════════
  ► Local Website:    http://localhost:${ENV.PORT}
  ► REST API Base:    http://localhost:${ENV.PORT}/api
  ► Health Check:     http://localhost:${ENV.PORT}/api/health
  ► Environment:      ${ENV.NODE_ENV}
  ► Static Assets:    ${clientDistPath || 'API Mode'}
  ► Website crafted by GDGoC ITER
  ══════════════════════════════════════════════════════════
    `);
  });
}

export default app;
