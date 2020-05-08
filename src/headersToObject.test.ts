import { headersToObject } from './headersToObject'

describe('headersToObject', () => {
  describe('given Headers with a single header', () => {
    it('should return that single header in an Object', () => {
      const headers = new Headers({ 'Content-Type': 'application/json' })
      expect(headersToObject(headers)).toEqual({
        'content-type': 'application/json',
      })
    })
  })

  describe('given Headers with a single header and multiple values', () => {
    it('should put that header values into an array', () => {
      const headers = new Headers({ Accept: 'application/json' })
      headers.append('Accept', 'text/plain')

      expect(headersToObject(headers)).toEqual({
        accept: ['application/json', 'text/plain'],
      })
    })
  })

  describe('given Headers with multiple different headers', () => {
    it('should return an object representing those headers', () => {
      const headers = new Headers({
        Accept: 'application/json',
        'Content-Length': '1234',
        'Content-Type': 'application/json',
      })
      headers.append('Accept', 'text/plain')

      expect(headersToObject(headers)).toEqual({
        accept: ['application/json', 'text/plain'],
        'content-length': '1234',
        'content-type': 'application/json',
      })
    })
  })
})
