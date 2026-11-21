export type MonitorStatus = 'pending' | 'up' | 'down' | 'paused'

export type Monitor = {
  id: string
  name: string
  url: string
  intervalSeconds: number
  status: MonitorStatus
}

//Funciona como un dto va sin ID ni status eso lo asigna el sistema
export type NewMonitor = {
  name: string
  url: string
  intervalSeconds: number
}
