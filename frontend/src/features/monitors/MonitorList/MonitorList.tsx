import { MonitorCard } from '../MonitorCard/MonitorCard'
import styles from './MonitorList.module.css'
import type { Monitor } from '../types'

type MonitorListProps = {
  monitors: Monitor[]
}

export const MonitorList = ({ monitors }: MonitorListProps) => {
  return (
    <ul className={styles.monitorList}>
      {monitors.map((monitor) => (
        <li key={monitor.id}>
          <MonitorCard monitor={monitor} />
        </li>
      ))}
    </ul>
  )
}
