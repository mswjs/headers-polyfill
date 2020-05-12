/**
 * Converts a string representation of headers (i.e. from XMLHttpRequest)
 * to a `Headers` instance.
 */
export function stringToHeaders(str: string): Headers {
  const lines = str.trim().split(/[\r\n]+/)

  return lines.reduce<Headers>((headers, line) => {
    const parts = line.split(': ')
    const name = parts.shift()
    const value = parts.join(': ')
    headers.append(name, value)
    return headers
  }, new Headers())
}
