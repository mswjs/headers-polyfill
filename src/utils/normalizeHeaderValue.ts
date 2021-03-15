export function normalizeHeaderValue(value: string): string {
  if (typeof value !== 'string') {
    value = String(value)
  }

  return value
}
