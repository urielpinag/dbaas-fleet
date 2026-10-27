import { createApp } from './app.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const app = createApp();

const server = app.listen(config.port, () => {
  console.log(
    JSON.stringify({
      level: 'info',
      msg: 'api_started',
      service: config.serviceName,
      port: config.port,
      env: config.nodeEnv,
    }),
  );
});

function shutdown(signal: string): void {
  console.log(JSON.stringify({ level: 'info', msg: 'shutdown', signal }));
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
