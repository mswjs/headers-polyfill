import { objectToHeaders } from './objectToHeaders'
import { HeadersObject } from './glossary'

describe('objectToHeaders', () => {
  describe('given an object representation of headers', () => {
    it('should return a Headers instance', () => {
      const headersObject: HeadersObject = {
        Accept: ['application/json', 'text/plain'],
        'Content-Length': '1234',
        'Content-Type': 'text/xml',
      }
      const headers = objectToHeaders(headersObject)

      expect(headers).toBeInstanceOf(Headers)
      expect(headers.get('accept')).toEqual('application/json, text/plain')
      expect(headers.get('content-length')).toEqual('1234')
      expect(headers.get('content-type')).toEqual('text/xml')
    })
  })
})
