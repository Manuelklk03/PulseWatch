import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MonitorsPage } from './MonitorsPage'

describe('MonitorsPage', () => {
  it('se identifica como la región Monitores', () => {
    render(<MonitorsPage />)

    expect(
      screen.getByRole('region', { name: 'Monitores' }),
    ).toBeInTheDocument()
  })

  it('muestra el estado vacío cuando no hay monitores', () => {
    render(<MonitorsPage />)

    expect(screen.getByText('Aún no hay monitores')).toBeInTheDocument()
  })
})
