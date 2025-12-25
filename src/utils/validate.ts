export function validateNumberArray(arr: any[], minLength = 1): { valid: boolean; error?: string } {
  if (!Array.isArray(arr)) {
    return { valid: false, error: '输入必须是数组' }
  }

  if (arr.length < minLength) {
    return { valid: false, error: `至少需要 ${minLength} 个数字` }
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
      return { valid: false, error: `第 ${i + 1} 项不是有效的数字` }
    }
  }

  return { valid: true }
}

export function parseCSVNumbers(input: string): { numbers: number[]; error?: string } {
  const parts = input.split(/[,;\s\n]+/).filter((s) => s.trim())
  const numbers: number[] = []

  for (const part of parts) {
    const num = parseFloat(part)
    if (isNaN(num)) {
      return { numbers: [], error: `"${part}" 不是有效的数字` }
    }
    numbers.push(num)
  }

  return { numbers }
}
