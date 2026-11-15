import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('muestra el título y la descripción recibidos', () => {
    render(
      <EmptyState
        title="Sin datos"
        description="Aún no hay nada que mostrar."
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Sin datos' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Aún no hay nada que mostrar.')).toBeInTheDocument()
  })
})
