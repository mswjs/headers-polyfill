import { reduceHeadersObject } from './reduceHeadersObject'

/**
 * Converts a given headers object to a new `Headers` instance.
 */
export function objectToHeaders(
  obj: Record<string, string | string[] | undefined>
): Headers {
  return reduceHeadersObject<Headers>(
    obj,
    (headers, name, value) => {
      const values = ([] as string[]).concat(value).filter(Boolean)

      values.forEach((value) => {
        headers.append(name, value)
      })

      return headers
    },
    new Headers()
  )
}
