import { HeadersObject } from './glossary'

type FlatHeadersObject = Record<string, string>

export function flattenHeadersObject(obj: HeadersObject): FlatHeadersObject {
  return Object.keys(obj).reduce<FlatHeadersObject>((acc, name) => {
    acc[name] = ([] as string[]).concat(obj[name]).join('; ')
    return acc
  }, {})
}
