import { listToHeaders } from './listToHeaders'
import { HeadersList } from './glossary'

describe('listToHeaders', () => {
  describe('given a list representation of headers', () => {
    it('should return a Headers instance', () => {
      const list: HeadersList = [
        ['accept', ['application/json', 'text/plain']],
        ['content-length', '1234'],
        ['content-type', 'application/json'],
      ]

      const headers = listToHeaders(list)
      expect(headers).toBeInstanceOf(Headers)
      expect(headers.get('accept')).toEqual('application/json, text/plain')
      expect(headers.get('content-length')).toEqual('1234')
      expect(headers.get('content-type')).toEqual('application/json')
    })
  })
})
