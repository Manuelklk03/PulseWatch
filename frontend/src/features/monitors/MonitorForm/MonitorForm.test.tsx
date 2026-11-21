import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { NewMonitor } from '../types'
import { MonitorForm } from './MonitorForm'

// Prepara el formulario con funciones falsas y un "usuario virtual".
// vi.fn() crea una función espía: recuerda con qué se la llamó.
function setup() {
  const onSubmit = vi
    .fn<(monitor: NewMonitor) => Promise<void>>()
    .mockResolvedValue(undefined)
  const onCancel = vi.fn()
  const user = userEvent.setup()

  render(<MonitorForm onCancel={onCancel} onSubmit={onSubmit} />)

  return { onSubmit, onCancel, user }
}

describe('MonitorForm', () => {
  it('no envía y señala los campos incorrectos si faltan datos', async () => {
    const { onSubmit, user } = setup()

    await user.click(screen.getByRole('button', { name: 'Crear monitor' }))

    expect(onSubmit).not.toHaveBeenCalled()

    const name = screen.getByLabelText('Nombre')
    expect(name).toHaveAttribute('aria-invalid', 'true')
    // El error está ASOCIADO al campo (lo lee un lector de pantalla), no solo pintado cerca.
    expect(name).toHaveAccessibleDescription('Escribe un nombre.')
    // Y el cursor se coloca en el primer campo con error.
    expect(name).toHaveFocus()
    expect(screen.getByLabelText('Dirección')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('envía los datos sin espacios sobrantes cuando son válidos', async () => {
    const { onSubmit, user } = setup()

    await user.type(screen.getByLabelText('Nombre'), '  Web nueva  ')
    await user.type(screen.getByLabelText('Dirección'), ' https://example.com ')
    await user.click(screen.getByRole('button', { name: 'Crear monitor' }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Web nueva',
      url: 'https://example.com',
      intervalSeconds: 60,
    })
  })

  it('avisa si el envío falla', async () => {
    const { onSubmit, user } = setup()
    onSubmit.mockRejectedValue(new Error('fallo de red'))

    await user.type(screen.getByLabelText('Nombre'), 'Web nueva')
    await user.type(screen.getByLabelText('Dirección'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: 'Crear monitor' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudo crear el monitor',
    )
  })

  it('llama a onCancel al pulsar Cancelar', async () => {
    const { onCancel, user } = setup()

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onCancel).toHaveBeenCalledOnce()
  })
})
