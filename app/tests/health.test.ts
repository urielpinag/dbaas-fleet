import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('GET /health', () => {
  it('responde 200 con el estado del servicio', async () => {
    const response = await request(createApp()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'dbaas-fleet-api',
      version: '0.1.0',
    });
    expect(typeof response.body.uptimeSeconds).toBe('number');
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('GET /ready', () => {
  it('responde 200 cuando el proceso está listo', async () => {
    const response = await request(createApp()).get('/ready');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ready' });
  });
});

describe('ruta desconocida', () => {
  it('responde 404 con un error estructurado', async () => {
    const response = await request(createApp()).get('/no-existe');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'not_found' });
  });
});
