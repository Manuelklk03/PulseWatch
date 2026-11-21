import type { Monitor, NewMonitor } from './types'

// Datos de ejemplo provisionales: se sustituyen por la llamada a la API en la Fase 2.
const monitors: Monitor[] = [
  {
    id: '1',
    name: 'Web principal',
    url: 'https://example.com',
    intervalSeconds: 60,
    status: 'up',
  },
  {
    id: '2',
    name: 'API de pagos',
    url: 'https://api.example.com/health',
    intervalSeconds: 30,
    status: 'down',
  },
  {
    id: '3',
    name: 'Blog',
    url: 'https://blog.example.com',
    intervalSeconds: 300,
    status: 'paused',
  },
]

export function listMonitors(): Promise<Monitor[]> {
  return Promise.resolve(monitors)
}

export function createMonitor(input: NewMonitor): Promise<Monitor> {
  const monitor: Monitor = {
    id: crypto.randomUUID(),
    ...input,
    status: 'pending',
  }
  monitors.push(monitor)
  return Promise.resolve(monitor)
}
