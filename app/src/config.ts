export interface AppConfig {
  port: number;
  nodeEnv: string;
  serviceName: string;
  version: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const rawPort = env.PORT ?? '3000';
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`PORT inválido: ${rawPort}`);
  }

  return {
    port,
    nodeEnv: env.NODE_ENV ?? 'development',
    serviceName: 'dbaas-fleet-api',
    version: env.APP_VERSION ?? '0.1.0',
  };
}
