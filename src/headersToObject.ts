import { HeadersObject } from './glossary'

/**
 * Converts a given `Headers` instance into a plain object.
 * Respects headers with multiple values.
 */
export function headersToObject(headers: Headers): HeadersObject {
  const headersObject: HeadersObject = {}

  headers.forEach((value, name) => {
    const isMultiValue = value.includes(',')
    headersObject[name] = isMultiValue
      ? value.split(',').map((s) => s.trim())
      : value
  })

  return headersObject
}
