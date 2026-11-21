import { describe, expect, it } from 'vitest'

import {
  MAX_INTERVAL_SECONDS,
  MIN_INTERVAL_SECONDS,
  validateMonitorForm,
  type MonitorFormValues,
} from './validateMonitorForm'

// Valores válidos de partida. Cada prueba cambia SOLO el campo que le interesa.
const validValues: MonitorFormValues = {
  name: 'Web principal',
  url: 'https://example.com',
  interval: '60',
}

describe('validateMonitorForm', () => {
  it('no devuelve errores con valores válidos', () => {
    expect(validateMonitorForm(validValues)).toEqual({})
  })

  it('exige un nombre que no sea solo espacios', () => {
    const errors = validateMonitorForm({ ...validValues, name: '   ' })

    expect(errors.name).toBe('Escribe un nombre.')
  })

  it.each([
    ['vacía', ''],
    ['sin protocolo', 'example.com'],
    ['con otro protocolo', 'ftp://example.com'],
    ['con usuario y contraseña', 'https://admin:secreto@example.com'],
  ])('rechaza una dirección %s', (_description, url) => {
    const errors = validateMonitorForm({ ...validValues, url })

    expect(errors.url).toBeDefined()
  })

  it('acepta direcciones http y https', () => {
    expect(
      validateMonitorForm({ ...validValues, url: 'http://example.com' }).url,
    ).toBeUndefined()
    expect(
      validateMonitorForm({ ...validValues, url: 'https://example.com/health' })
        .url,
    ).toBeUndefined()
  })

  it.each([
    ['vacío', ''],
    ['no numérico', 'abc'],
    ['decimal', '45.5'],
    ['por debajo del mínimo', String(MIN_INTERVAL_SECONDS - 1)],
    ['por encima del máximo', String(MAX_INTERVAL_SECONDS + 1)],
  ])('rechaza un intervalo %s', (_description, interval) => {
    const errors = validateMonitorForm({ ...validValues, interval })

    expect(errors.interval).toBeDefined()
  })

  it('acepta el intervalo en los dos límites', () => {
    for (const interval of [MIN_INTERVAL_SECONDS, MAX_INTERVAL_SECONDS]) {
      const errors = validateMonitorForm({
        ...validValues,
        interval: String(interval),
      })

      expect(errors.interval).toBeUndefined()
    }
  })

  it('informa de varios errores a la vez', () => {
    const errors = validateMonitorForm({ name: '', url: '', interval: '' })

    expect(Object.keys(errors)).toEqual(['name', 'url', 'interval'])
  })
})
