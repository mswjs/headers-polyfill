import { HeadersObject } from './glossary'
import { reduceHeadersObject } from './reduceHeadersObject'

/**
 * Converts a given headers object to a new `Headers` instance.
 */
export function objectToHeaders(obj: HeadersObject): Headers {
  return reduceHeadersObject<Headers>(
    obj,
    (headers, name, value) => {
      const values = ([] as string[]).concat(value)

      values.forEach((value) => {
        headers.append(name, value)
      })

      return headers
    },
    new Headers()
  )
}
