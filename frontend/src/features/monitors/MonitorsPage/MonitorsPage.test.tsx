import { render, screen } from '@testing-library/react'
// userEvent simula a una persona: clics, teclado... (instalado en la rama).
import userEvent from '@testing-library/user-event'
// vi es el "cajón de herramientas" de Vitest: sirve para crear mocks.
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MonitorsPage } from './MonitorsPage'
import { listMonitors, createMonitor } from '../monitorsApi'
import type { Monitor } from '../types'

// MOCK: sustituye el archivo monitorsApi por una versión FALSA cuyas
// respuestas decidimos nosotros en cada prueba. Así probamos la pantalla y no
// los datos de ejemplo, y no dependemos de nada externo (docs/quality.md).
vi.mock('../monitorsApi')

// Le decimos a TypeScript que listMonitors ahora es un mock, para poder usar
// .mockResolvedValue(...) sin que se queje.
const listMonitorsMock = vi.mocked(listMonitors)
const createMonitorMock = vi.mocked(createMonitor)

// Un monitor de prueba, reutilizado por varias pruebas.
const webMonitor: Monitor = {
  id: '1',
  name: 'Web principal',
  url: 'https://example.com',
  intervalSeconds: 60,
  status: 'up',
}

describe('MonitorsPage', () => {
  // Antes de CADA prueba, borra lo que el mock "recordaba" de la anterior,
  // para que una prueba no afecte a otra.
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('se identifica como la región Monitores', async () => {
    // "mockResolvedValue([])": la función devolverá una promesa cumplida con [].
    listMonitorsMock.mockResolvedValue([])

    render(<MonitorsPage />)

    // findBy... ESPERA hasta que el elemento aparezca (getBy... falla al
    // instante si no está). Como los datos llegan después, usamos findBy y await.
    expect(
      await screen.findByRole('region', { name: 'Monitores' }),
    ).toBeInTheDocument()
  })

  it('anuncia la carga mientras espera los monitores', () => {
    // Una promesa que NUNCA termina: nos deja congelados en "cargando".
    listMonitorsMock.mockReturnValue(new Promise(() => {}))

    render(<MonitorsPage />)

    // Aquí no hace falta esperar: "Cargando" es lo primero que se ve.
    expect(screen.getByRole('status')).toHaveTextContent('Cargando monitores')
  })

  it('muestra el estado vacío cuando no hay monitores', async () => {
    listMonitorsMock.mockResolvedValue([])

    render(<MonitorsPage />)

    expect(await screen.findByText('Aún no hay monitores')).toBeInTheDocument()
  })

  it('muestra cada monitor con su estado cuando hay datos', async () => {
    listMonitorsMock.mockResolvedValue([webMonitor])

    render(<MonitorsPage />)

    expect(
      await screen.findByRole('heading', { name: 'Web principal' }),
    ).toBeInTheDocument()
    // Ya apareció el título, así que el resto está dibujado: getBy sirve.
    expect(screen.getByText('Operativo')).toBeInTheDocument()
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
  })

  it('avisa del error y permite reintentar', async () => {
    // setup() prepara un "usuario virtual". Se llama al empezar la prueba.
    const user = userEvent.setup()
    listMonitorsMock
      // La PRIMERA llamada falla...
      .mockRejectedValueOnce(new Error('fallo de red'))
      // ...y la SEGUNDA (el reintento) sale bien con lista vacía.
      .mockResolvedValueOnce([])

    render(<MonitorsPage />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudieron cargar los monitores',
    )

    // El usuario hace clic en "Reintentar". "await" porque es asíncrono.
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(await screen.findByText('Aún no hay monitores')).toBeInTheDocument()
  })
  it('crea un monitor desde el formulario y recarga la lista', async () => {
    const user = userEvent.setup()
    // Primera carga: lista vacía. Tras crear, la recarga ya trae el monitor.
    listMonitorsMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([webMonitor])
    createMonitorMock.mockResolvedValue(webMonitor)

    render(<MonitorsPage />)

    await user.click(screen.getByRole('button', { name: 'Añadir monitor' }))
    await user.type(screen.getByLabelText('Nombre'), 'Web principal')
    await user.type(screen.getByLabelText('Dirección'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: 'Crear monitor' }))

    expect(createMonitorMock).toHaveBeenCalledWith({
      name: 'Web principal',
      url: 'https://example.com',
      intervalSeconds: 60,
    })
    expect(
      await screen.findByRole('heading', { name: 'Web principal' }),
    ).toBeInTheDocument()
    // El formulario se ha cerrado.
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('cierra el formulario al cancelar', async () => {
    const user = userEvent.setup()
    listMonitorsMock.mockResolvedValue([])

    render(<MonitorsPage />)

    await user.click(screen.getByRole('button', { name: 'Añadir monitor' }))
    expect(
      screen.getByRole('form', { name: 'Nuevo monitor' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Añadir monitor' }),
    ).toBeInTheDocument()
  })
})
