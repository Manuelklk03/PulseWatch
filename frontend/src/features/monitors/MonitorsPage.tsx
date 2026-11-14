import { EmptyState } from '../../shared/EmptyState/EmptyState'

import styles from './MonitorsPage.module.css'

export function MonitorsPage() {
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

      <EmptyState
        title="Aún no hay monitores"
        description="Cuando registres un servicio, aparecerá aquí con su estado y sus tiempos de respuesta."
      />
    </section>
  )
}
