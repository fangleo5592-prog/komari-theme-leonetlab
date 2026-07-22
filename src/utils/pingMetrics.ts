export interface PingSampleSummary {
  latency: number | null
  loss: number | null
}

export interface PingTaskSample {
  task_id: number
  value: number
}

export function summarizePingSamples(values: number[]): PingSampleSummary {
  if (!values.length)
    return { latency: null, loss: null }

  const validValues = values.filter(value => Number.isFinite(value) && value >= 0)
  const latency = validValues.length
    ? validValues.reduce((sum, value) => sum + value, 0) / validValues.length
    : null

  return {
    latency,
    loss: (values.length - validValues.length) / values.length * 100,
  }
}

export function getPingTaskIdsWithSamples(records: PingTaskSample[]): Set<number> {
  return new Set(
    records
      .filter(record => Number.isInteger(record.task_id) && Number.isFinite(record.value))
      .map(record => record.task_id),
  )
}

export function getLatencyToneClass(latency: number): string {
  if (latency <= 60)
    return 'bg-emerald-600/90'
  if (latency <= 100)
    return 'bg-green-400/80'
  if (latency <= 160)
    return 'bg-lime-400/80'
  if (latency <= 200)
    return 'bg-yellow-400/80'
  return 'bg-rose-500/80'
}

export function getLossToneClass(loss: number): string {
  if (loss <= 1)
    return 'bg-emerald-600/90'
  if (loss <= 3)
    return 'bg-green-400/90'
  if (loss <= 6)
    return 'bg-lime-400/90'
  if (loss <= 9)
    return 'bg-yellow-400/90'
  return 'bg-rose-500/80'
}
