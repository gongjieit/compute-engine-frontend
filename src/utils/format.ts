export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

export function formatPercentage(num: number, decimals = 2): string {
  return `${(num * 100).toFixed(decimals)}%`
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatExecutionTime(seconds: number): string {
  if (seconds < 0.001) {
    return `${(seconds * 1000000).toFixed(2)}μs`
  } else if (seconds < 1) {
    return `${(seconds * 1000).toFixed(2)}ms`
  } else {
    return `${seconds.toFixed(4)}s`
  }
}
