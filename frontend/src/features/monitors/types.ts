export type MonitorStatus = 'up' | 'down' | 'paused'

export type Monitor = {
  id: string
  name: string
  url: string
  intervalSeconds: number
  status: MonitorStatus
}
