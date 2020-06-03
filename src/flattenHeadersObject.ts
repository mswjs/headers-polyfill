import { HeadersObject, FlatHeadersObject } from './glossary'
import { reduceHeadersObject } from './reduceHeadersObject'

export function flattenHeadersObject(obj: HeadersObject): FlatHeadersObject {
  return reduceHeadersObject<FlatHeadersObject>(
    obj,
    (headers, name, value) => {
      headers[name] = ([] as string[]).concat(value).join('; ')
      return headers
    },
    {}
  )
}
