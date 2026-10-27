import express, { type ErrorRequestHandler, type Express, type Request, type Response } from 'express';
import { loadConfig } from './config.js';

export function createApp(): Express {
  const config = loadConfig();
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: config.serviceName,
      version: config.version,
      env: config.nodeEnv,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/ready', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ready' });
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'not_found' });
  });

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(JSON.stringify({ level: 'error', msg: 'unhandled_error', error: String(err) }));
    res.status(500).json({ error: 'internal_error' });
  };

  app.use(errorHandler);

  return app;
}
