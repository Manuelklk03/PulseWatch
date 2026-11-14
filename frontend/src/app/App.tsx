import { MonitorsPage } from '../features/monitors/MonitorsPage'

import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <h1 className={styles.app__title}>PulseWatch</h1>
      </header>
      <main className={styles.app__main}>
        <MonitorsPage />
      </main>
    </div>
  )
}
