import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { NewMonitor } from '../types'
import styles from './MonitorForm.module.css'
import {
  MAX_INTERVAL_SECONDS,
  MIN_INTERVAL_SECONDS,
  validateMonitorForm,
  type MonitorFormErrors,
  type MonitorFormValues,
} from './validateMonitorForm'

type MonitorFormProps = {
  onSubmit: (monitor: NewMonitor) => Promise<void>
  onCancel: () => void
}

const INITIAL_VALUES: MonitorFormValues = {
  name: '',
  url: '',
  interval: '60',
}

export function MonitorForm({ onSubmit, onCancel }: MonitorFormProps) {
  const [values, setValues] = useState<MonitorFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<MonitorFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  function handleChange(field: keyof MonitorFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const foundErrors = validateMonitorForm(values)
    setErrors(foundErrors)

    if (foundErrors.name) {
      nameRef.current?.focus()
      return
    }

    if (foundErrors.url) {
      urlRef.current?.focus()
      return
    }

    if (foundErrors.interval) {
      intervalRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        name: values.name.trim(),
        url: values.url.trim(),
        intervalSeconds: Number(values.interval),
      })
    } catch {
      setSubmitError('No se pudo crear el monitor. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      aria-labelledby="monitor-form-title"
      className={styles.monitorForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <h3 className={styles.monitorForm__title} id="monitor-form-title">
        Nuevo monitor
      </h3>

      <div className={styles.monitorForm__field}>
        <label htmlFor="monitor-name" className={styles.monitorForm__label}>
          Nombre
        </label>
        <input
          // aria-invalid avisa a tecnologías de apoyo de que el valor es erróneo.
          // undefined = el atributo no se escribe cuando no hay error.
          aria-invalid={errors.name ? true : undefined}
          // aria-describedby enlaza el campo con el texto que lo explica.
          aria-describedby={errors.name ? 'monitor-name-error' : undefined}
          autoComplete="off"
          className={styles.monitorForm__input}
          id="monitor-name"
          onChange={(event) => handleChange('name', event.target.value)}
          ref={nameRef}
          type="text"
          value={values.name}
        />
        {errors.name && (
          <p className={styles.monitorForm__error} id="monitor-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.monitorForm__field}>
        <label htmlFor="monitor-url" className={styles.monitorForm__label}>
          Dirección
        </label>
        <input
          aria-invalid={errors.url ? true : undefined}
          // Dos textos asociados: la ayuda siempre, y el error si existe.
          aria-describedby={`monitor-url-hint${errors.url ? ' monitor-url-error' : ''}`}
          autoComplete="off"
          className={styles.monitorForm__input}
          id="monitor-url"
          onChange={(event) => handleChange('url', event.target.value)}
          ref={urlRef}
          type="url"
          value={values.url}
        />
        <p className={styles.monitorForm__hint} id="monitor-url-hint">
          Debe empezar por http:// o https://
        </p>
        {errors.url && (
          <p className={styles.monitorForm__error} id="monitor-url-error">
            {errors.url}
          </p>
        )}
      </div>

      <div className={styles.monitorForm__field}>
        <label htmlFor="monitor-interval" className={styles.monitorForm__label}>
          Intervalo (segundos)
        </label>
        <input
          aria-invalid={errors.interval ? true : undefined}
          aria-describedby={`monitor-interval-hint${errors.interval ? ' monitor-interval-error' : ''}`}
          className={styles.monitorForm__input}
          id="monitor-interval"
          max={MAX_INTERVAL_SECONDS}
          min={MIN_INTERVAL_SECONDS}
          onChange={(event) => handleChange('interval', event.target.value)}
          ref={intervalRef}
          type="number"
          value={values.interval}
        />
        <p className={styles.monitorForm__hint} id="monitor-interval-hint">
          Entre {MIN_INTERVAL_SECONDS} y {MAX_INTERVAL_SECONDS} segundos.
        </p>
        {errors.interval && (
          <p className={styles.monitorForm__error} id="monitor-interval-error">
            {errors.interval}
          </p>
        )}
      </div>

      {submitError && (
        <p className={styles.monitorForm__error} role="alert">
          {submitError}
        </p>
      )}

      <div className={styles.monitorForm__actions}>
        <button
          className={styles.monitorForm__button}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Crear monitor'}
        </button>

        <button
          className={`${styles.monitorForm__button} ${styles['monitorForm__button--secondary']}`}
          onClick={onCancel}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
