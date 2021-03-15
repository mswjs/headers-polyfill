import HeadersPolyfill from './Headers'
import { HeadersList } from './glossary'

export function listToHeaders(list: HeadersList): HeadersPolyfill {
  const headers = new HeadersPolyfill()

  list.forEach(([name, value]) => {
    const values = ([] as string[]).concat(value)

    values.forEach((value) => {
      headers.append(name, value)
    })
  })

  return headers
}
