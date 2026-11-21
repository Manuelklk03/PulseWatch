import styles from './MonitorCard.module.css'
import type { Monitor, MonitorStatus } from '../types'

const STATUS_LABELS: Record<MonitorStatus, string> = {
  pending: 'Pendiente',
  up: 'Operativo',
  down: 'Caído',
  paused: 'Pausado',
}

type MonitorCardProps = {
  monitor: Monitor
}

export function MonitorCard({ monitor }: MonitorCardProps) {
  return (
    <article className={styles.monitorCard}>
      <header className={styles.monitorCard__header}>
        <h3 className={styles.monitorCard__name}>{monitor.name}</h3>
        <span
          className={`${styles.monitorCard__status} ${styles[`monitorCard__status--${monitor.status}`]}`}
        >{`${STATUS_LABELS[monitor.status]}`}</span>
      </header>
      <p className={styles.monitorCard__url}>{monitor.url}</p>
      <p className={styles.monitorCard__interval}>
        Cada {monitor.intervalSeconds} segundos
      </p>
    </article>
  )
}
