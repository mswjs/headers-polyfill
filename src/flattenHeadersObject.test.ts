import { flattenHeadersObject } from './flattenHeadersObject'
import { HeadersObject } from './glossary'

describe('flattenHeadersObject', () => {
  describe('given a headers object', () => {
    it('should flatten its multi-value headers', () => {
      const headersObject: HeadersObject = {
        Accept: ['application/json', 'text/xml'],
        'Content-Type': 'application/pdf',
      }

      expect(flattenHeadersObject(headersObject)).toEqual({
        Accept: 'application/json; text/xml',
        'Content-Type': 'application/pdf',
      })
    })
  })
})
