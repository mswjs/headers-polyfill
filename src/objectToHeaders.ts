import { HeadersObject } from './glossary'

export function objectToHeaders(obj: HeadersObject): Headers {
  const headers = new Headers()

  Object.keys(obj).forEach((name) => {
    const values = ([] as string[]).concat(obj[name])

    values.forEach((value) => {
      headers.append(name, value)
    })
  })

  return headers
}
