import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MonitorCard } from './MonitorCard'
import type { Monitor, MonitorStatus } from '../types'

// Función auxiliar: crea un monitor de prueba cambiando SOLO el estado.
// Evita repetir el objeto entero en cada prueba.
function buildMonitor(status: MonitorStatus): Monitor {
  return {
    id: '1',
    name: 'API de pagos',
    url: 'https://api.example.com/health',
    intervalSeconds: 30,
    status,
  }
}

describe('MonitorCard', () => {
  it('muestra nombre, dirección e intervalo del monitor', () => {
    render(<MonitorCard monitor={buildMonitor('up')} />)

    expect(
      screen.getByRole('heading', { name: 'API de pagos' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('https://api.example.com/health'),
    ).toBeInTheDocument()
    expect(screen.getByText('Cada 30 segundos')).toBeInTheDocument()
  })

  // it.each ejecuta LA MISMA prueba con varios datos: genera 3 pruebas con
  // un solo bloque. Cada fila es [estado, texto esperado].
  it.each([
    ['pending', 'Pendiente'],
    ['up', 'Operativo'],
    ['down', 'Caído'],
    ['paused', 'Pausado'],
    // "as const" hace que TypeScript trate 'up' como el literal 'up' y no
    // como un string cualquiera; así buildMonitor(status) compila.
  ] as const)('indica con texto el estado %s', (status, label) => {
    render(<MonitorCard monitor={buildMonitor(status)} />)

    // Esto protege que el estado se diga CON TEXTO, no solo con color.
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
