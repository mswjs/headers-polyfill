import HeadersPolyfill from './Headers'
import { reduceHeadersObject } from './reduceHeadersObject'

/**
 * Converts a given headers object to a new `Headers` instance.
 */
export function objectToHeaders(
  headersObject: Record<string, string | string[] | undefined>
): HeadersPolyfill {
  return reduceHeadersObject(
    headersObject,
    (headers, name, value) => {
      const values = ([] as string[]).concat(value).filter(Boolean)

      values.forEach((value) => {
        headers.append(name, value)
      })

      return headers
    },
    new HeadersPolyfill()
  )
}
