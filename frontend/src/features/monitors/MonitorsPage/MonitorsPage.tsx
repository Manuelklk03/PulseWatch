import { EmptyState } from '../../../shared/EmptyState/EmptyState'
import { MonitorList } from '../MonitorList/MonitorList'
import { useMonitors } from '../useMonitors'
import styles from './MonitorsPage.module.css'

export function MonitorsPage() {
  const { state, retry } = useMonitors()

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
            onClick={retry}
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
