import { HeadersList } from './glossary'

type FlatHeadersList = [string, string][]

export function flattenHeadersList(list: HeadersList): FlatHeadersList {
  return list.map(([name, values]) => {
    return [name, ([] as string[]).concat(values).join('; ')]
  })
}
