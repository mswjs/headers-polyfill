import { HeadersObject, FlatHeadersObject } from '../glossary'
import { reduceHeadersObject } from './reduce-headers-object'

export function flattenHeadersObject(
  headersObject: HeadersObject
): FlatHeadersObject {
  return reduceHeadersObject<FlatHeadersObject>(
    headersObject,
    (headers, name, value) => {
      headers[name] = ([] as string[]).concat(value).join(', ')
      return headers
    },
    {}
  )
}
