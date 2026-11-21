export const MIN_INTERVAL_SECONDS = 30
export const MAX_INTERVAL_SECONDS = 3600

export type MonitorFormValues = {
  name: string
  url: string
  interval: string
}

export type MonitorFormErrors = Partial<Record<keyof MonitorFormValues, string>>

export function validateUrl(raw: string): string | undefined {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return 'Escribe una dirección completa, por ejemplo https://example.com.'
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return 'Solo se admiten direcciones http o https.'
  }

  // https://usuario:clave@sitio.com guardaría una contraseña en el monitor.
  if (url.username !== '' || url.password !== '') {
    return 'La dirección no puede incluir usuario ni contraseña.'
  }

  return undefined
}

function validateInterval(raw: string): string | undefined {
  const seconds = Number(raw)

  const isValid =
    raw.trim() !== '' &&
    Number.isInteger(seconds) &&
    seconds >= MIN_INTERVAL_SECONDS &&
    seconds <= MAX_INTERVAL_SECONDS

  return isValid
    ? undefined
    : `El intervalo debe ser un número entero entre ${MIN_INTERVAL_SECONDS} y ${MAX_INTERVAL_SECONDS}.`
}

export function validateMonitorForm(
  values: MonitorFormValues,
): MonitorFormErrors {
  const errors: MonitorFormErrors = {}

  if (values.name.trim() === '') {
    errors.name = 'Escribe un nombre.'
  }

  const urlError = validateUrl(values.url)
  if (urlError) {
    errors.url = urlError
  }

  const intervalError = validateInterval(values.interval)
  if (intervalError) {
    errors.interval = intervalError
  }

  return errors
}
