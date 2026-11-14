import styles from './EmptyState.module.css'

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <h2 className={styles.emptyState__title}>{title}</h2>
      <p className={styles.emptyState__description}>{description}</p>
    </div>
  )
}
