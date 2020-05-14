import { Headers } from './Headers'

describe('Headers', () => {
  describe('given I create a new Headers instance', () => {
    describe('without any arguments', () => {
      it('should return an empty object', () => {
        const h = new Headers()
        expect(h.getAllHeaders()).toEqual({})
      })
    })

    describe('with initial headers object', () => {
      it('should return that headers object', () => {
        const h = new Headers({ accept: '*/*' })
        expect(h.get('accept')).toEqual('*/*')
      })
    })

    describe('with initial headers list', () => {
      describe('with a single value', () => {
        it('should set that value', () => {
          const h = new Headers([['accept', '*/*']])
          expect(h.get('accept')).toEqual('*/*')
        })
      })

      describe('with multiple values represented as a list', () => {
        it('should join values', () => {
          const h = new Headers([['accept', ['application/json', 'image/png']]])
          expect(h.get('accept')).toEqual('application/json, image/png')
        })
      })

      describe('with multiple values represented as a string', () => {
        it('should preserve values as-is', () => {
          const h = new Headers([['accept', 'application/json, image/png']])
          expect(h.get('accept')).toEqual('application/json, image/png')
        })
      })
    })
  })

  describe('.get()', () => {
    describe('given getting an existing header', () => {
      it('should return that header value', () => {
        const h = new Headers({ accept: '*/*' })
        expect(h.get('accept')).toEqual('*/*')
      })
    })

    describe('given getting a non-existing header', () => {
      it('should return explicit null', () => {
        const h = new Headers({ accept: '*/*' })
        expect(h.get('content-type')).toBeNull()
      })
    })
  })

  describe('.getAllHeaders()', () => {
    describe('given getting all the headers', () => {
      describe('and the headers are empty', () => {
        it('should return an empty object', () => {
          const h = new Headers()
          expect(h.getAllHeaders()).toEqual({})
        })
      })

      describe('and the headers are present', () => {
        const h = new Headers({
          accept: '*/*',
          'content-type': ['application/json', 'text/plain'],
        })
        expect(h.getAllHeaders()).toEqual({
          accept: '*/*',
          'content-type': 'application/json,text/plain',
        })
      })
    })
  })

  describe('.set()', () => {
    describe('given setting a new header', () => {
      const h = new Headers({ accept: '*/*' })
      h.set('content-type', 'application/json')

      it('should preserve existing headers', () => {
        expect(h.get('accept')).toEqual('*/*')
      })

      it('should add the new header', () => {
        expect(h.get('content-type')).toEqual('application/json')
      })
    })

    describe('given an existing header', () => {
      const h = new Headers({ accept: '*/*' })
      h.set('accept', 'image/png')

      it('should override the existing header', () => {
        expect(h.get('accept')).toEqual('image/png')
      })
    })
  })

  describe('.append()', () => {
    describe('given appending a new header', () => {
      const h = new Headers({ accept: '*/*' })
      h.append('content-type', 'application/json')

      it('should preserve existing headers', () => {
        expect(h.get('accept')).toEqual('*/*')
      })

      it('should append the new header', () => {
        expect(h.get('content-type')).toEqual('application/json')
      })
    })

    describe('given appending an existing header', () => {
      const h = new Headers({ accept: '*/*' })
      h.append('accept', 'image/png')

      it('should join headers by comma', () => {
        expect(h.get('accept')).toEqual('*/*, image/png')
      })
    })
  })

  describe('.has()', () => {
    describe('given looking for a header', () => {
      describe('and that header exists', () => {
        it('should return true', () => {
          const h = new Headers({ accept: '*/*' })
          expect(h.has('accept')).toBe(true)
        })

        describe('and that header does not exist', () => {
          it('should return false', () => {
            const h = new Headers({ accept: '*/*' })
            expect(h.has('content-type')).toBe(false)
          })
        })
      })
    })
  })

  describe('.delete()', () => {
    describe('given deleting an existing header', () => {
      it('should delete the header', () => {
        const h = new Headers({ accept: '*/*' })
        h.delete('accept')
        expect(h.get('accept')).toBeNull()
      })
    })

    describe('given deleting a non-existing header', () => {
      it('should do nothing', () => {
        const h = new Headers({ accept: '*/*' })
        h.delete('content-type')
        expect(h.get('accept')).toEqual('*/*')
      })
    })
  })
})
