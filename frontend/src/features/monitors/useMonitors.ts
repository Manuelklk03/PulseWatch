import { useEffect, useState } from 'react'
import type { Monitor } from './types'
import { listMonitors } from './monitorsApi'

type MonitorState =
  | { status: 'loading' }
  | { status: 'success'; monitors: Monitor[] }
  | { status: 'error' }

export function useMonitors() {
  const [state, setState] = useState<MonitorState>({ status: 'loading' })

  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    listMonitors()
      .then((monitors) => {
        if (!cancelled) setState({ status: 'success', monitors })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  function reload() {
    setState({ status: 'loading' })

    setAttempt((current) => current + 1)
  }

  return { state, reload }
}
