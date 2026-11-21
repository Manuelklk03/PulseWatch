import { useState } from 'react'
import { EmptyState } from '../../../shared/EmptyState/EmptyState'
import { MonitorList } from '../MonitorList/MonitorList'
import { MonitorForm } from '../MonitorForm/MonitorForm'
import { createMonitor } from '../monitorsApi'
import type { NewMonitor } from '../types'
import { useMonitors } from '../useMonitors'
import styles from './MonitorsPage.module.css'

export function MonitorsPage() {
  const { state, reload } = useMonitors()

  const [isCreating, setIsCreating] = useState(false)

  // Lo que pasa cuando el formulario envía datos válidos:
  // 1) se crea el monitor, 2) se cierra el formulario, 3) se recarga la lista.
  // Si createMonitor falla, el error llega al formulario, que lo muestra.
  async function handleCreate(monitor: NewMonitor) {
    await createMonitor(monitor)
    setIsCreating(false)
    reload()
  }

  return (
    <section aria-labelledby="monitors-title">
      <header className={styles.monitorsPage__header}>
        <h2 className={styles.monitorsPage__title} id="monitors-title">
          Monitores
        </h2>
        <p className={styles.monitorsPage__subtitle}>
          Servicios HTTP que PulseWatch comprobará periódicamente.
        </p>
      </header>

      {isCreating ? (
        <div className={styles.monitorsPage__form}>
          <MonitorForm
            onCancel={() => setIsCreating(false)}
            onSubmit={handleCreate}
          />
        </div>
      ) : (
        <div className={styles.monitorsPage__actions}>
          <button
            className={styles.monitorsPage__button}
            onClick={() => setIsCreating(true)}
            type="button"
          >
            Añadir monitor
          </button>
        </div>
      )}

      {state.status === 'loading' && (
        <p className={styles.monitorsPage__message} role="status">
          Cargando monitores…
        </p>
      )}

      {state.status === 'error' && (
        <div className={styles.monitorsPage__message} role="alert">
          <p>No se pudieron cargar los monitores.</p>
          <button
            className={styles.monitorsPage__button}
            onClick={reload}
            type="button"
          >
            Reintentar
          </button>
        </div>
      )}

      {state.status === 'success' && state.monitors.length === 0 && (
        <EmptyState
          title="Aún no hay monitores"
          description="Cuando registres un servicio, aparecerá aquí con su estado y sus tiempos de respuesta."
        />
      )}

      {state.status === 'success' && state.monitors.length > 0 && (
        <MonitorList monitors={state.monitors} />
      )}
    </section>
  )
}
