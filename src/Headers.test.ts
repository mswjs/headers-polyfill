import Headers from './Headers'

describe('given I create a new Headers instance', () => {
  describe('without any arguments', () => {
    it('should return an empty object', () => {
      const headers = new Headers()
      expect(headers.getAllHeaders()).toEqual({})
    })
  })

  describe('with initial headers object', () => {
    it('should return that headers object', () => {
      const headers = new Headers({ accept: '*/*' })
      expect(headers.get('accept')).toEqual('*/*')
    })
  })

  describe('with initial headers list', () => {
    describe('with a single value', () => {
      it('should set that value', () => {
        const headers = new Headers([['accept', '*/*']])
        expect(headers.get('accept')).toEqual('*/*')
      })
    })

    describe('with multiple values represented as a list', () => {
      it('should join values', () => {
        const headers = new Headers([
          ['accept', ['application/json', 'image/png']],
        ])
        expect(headers.get('accept')).toEqual('application/json, image/png')
      })
    })

    describe('with multiple values represented as a string', () => {
      it('should preserve values as-is', () => {
        const headers = new Headers([['accept', 'application/json, image/png']])
        expect(headers.get('accept')).toEqual('application/json, image/png')
      })
    })
  })
})

describe('[Symbol.iterator]', () => {
  describe('given a Headers instance with no headers set', () => {
    it('returns an empty iterator', () => {
      const headers = new Headers()
      const entries = []

      for (const entry of headers) {
        entries.push(entry)
      }

      expect(entries).toEqual([])
    })
  })

  describe('given a Headers instance with headers set', () => {
    const headers = new Headers({
      accept: '*/*',
      'accept-language': 'en-US',
      'content-type': 'application/json',
    })

    const entries = []

    for (const entry of headers) {
      entries.push(entry)
    }

    expect(entries).toEqual([
      ['accept', '*/*'],
      ['accept-language', 'en-US'],
      ['content-type', 'application/json'],
    ])
  })
})

describe('.keys()', () => {
  describe('given a Headers instance with no headers set', () => {
    it('returns an empty iterator', () => {
      const headers = new Headers()
      const keys = []

      for (const name of headers.keys()) {
        keys.push(name)
      }

      expect(keys).toEqual([])
    })
  })

  describe('given a Headers instance with headers set', () => {
    it('returns the list of header names', () => {
      const headers = new Headers({
        accept: '*/*',
        'accept-language': 'en-US',
        'content-type': 'application/json',
      })
      const keys = []

      for (const name of headers.keys()) {
        keys.push(name)
      }

      expect(keys).toEqual(['accept', 'accept-language', 'content-type'])
    })
  })
})

describe('.values()', () => {
  describe('given a Headers instance with no headers set', () => {
    it('returns an empty iterator', () => {
      const headers = new Headers()
      const values = []

      for (const value of headers.values()) {
        values.push(value)
      }

      expect(values).toEqual([])
    })
  })

  describe('given a Headers instance with headers set', () => {
    it('returns the list of header values', () => {
      const headers = new Headers({
        accept: '*/*',
        'accept-language': 'en-US',
        'content-type': 'application/json',
      })
      const values = []

      for (const value of headers.values()) {
        values.push(value)
      }

      expect(values).toEqual(['*/*', 'en-US', 'application/json'])
    })
  })
})

describe('.entries()', () => {
  describe('given a Headers instance with no headers set', () => {
    it('returns an empty iterator', () => {
      const headers = new Headers()
      const entries = []

      for (const entry of headers.entries()) {
        entries.push(entry)
      }

      expect(entries).toEqual([])
    })
  })

  describe('given a Headers instance with headers set', () => {
    it('returns the list of header entries', () => {
      const headers = new Headers({
        accept: '*/*',
        'accept-language': 'en-US',
        'content-type': 'application/json',
      })
      const entries = []

      for (const entry of headers.entries()) {
        entries.push(entry)
      }

      expect(entries).toEqual([
        ['accept', '*/*'],
        ['accept-language', 'en-US'],
        ['content-type', 'application/json'],
      ])
    })
  })
})

describe('.get()', () => {
  describe('given getting an existing header', () => {
    it('should return that header value', () => {
      const headers = new Headers({ accept: '*/*' })
      expect(headers.get('accept')).toEqual('*/*')
    })
  })

  describe('given getting a non-existing header', () => {
    it('should return explicit null', () => {
      const headers = new Headers({ accept: '*/*' })
      expect(headers.get('content-type')).toBeNull()
    })
  })
})

describe('.getAllHeaders()', () => {
  describe('given getting all the headers', () => {
    describe('and the headers are empty', () => {
      it('should return an empty object', () => {
        const headers = new Headers()
        expect(headers.getAllHeaders()).toEqual({})
      })
    })

    describe('and the headers are present', () => {
      const headers = new Headers({
        accept: '*/*',
        'content-type': ['application/json', 'text/plain'],
      })
      expect(headers.getAllHeaders()).toEqual({
        accept: '*/*',
        'content-type': 'application/json, text/plain',
      })
    })
  })
})

describe('.set()', () => {
  describe('given setting a new header', () => {
    const headers = new Headers({ accept: '*/*' })
    headers.set('content-type', 'application/json')

    it('should preserve existing headers', () => {
      expect(headers.get('accept')).toEqual('*/*')
    })

    it('should add the new header', () => {
      expect(headers.get('content-type')).toEqual('application/json')
    })
  })

  describe('given an existing header', () => {
    const headers = new Headers({ accept: '*/*' })
    headers.set('accept', 'image/png')

    it('should override the existing header', () => {
      expect(headers.get('accept')).toEqual('image/png')
    })
  })
})

describe('.append()', () => {
  describe('given appending a new header', () => {
    const headers = new Headers({ accept: '*/*' })
    headers.append('content-type', 'application/json')

    it('should preserve existing headers', () => {
      expect(headers.get('accept')).toEqual('*/*')
    })

    it('should append the new header', () => {
      expect(headers.get('content-type')).toEqual('application/json')
    })
  })

  describe('given appending an existing header', () => {
    const headers = new Headers({ accept: '*/*' })
    headers.append('accept', 'image/png')

    it('should join headers by comma', () => {
      expect(headers.get('accept')).toEqual('*/*, image/png')
    })
  })
})

describe('.has()', () => {
  describe('given looking for a header', () => {
    describe('and that header exists', () => {
      it('should return true', () => {
        const headers = new Headers({ accept: '*/*' })
        expect(headers.has('accept')).toBe(true)
      })

      describe('and that header does not exist', () => {
        it('should return false', () => {
          const headers = new Headers({ accept: '*/*' })
          expect(headers.has('content-type')).toBe(false)
        })
      })
    })
  })
})

describe('.delete()', () => {
  describe('given deleting an existing header', () => {
    it('should delete the header', () => {
      const headers = new Headers({ accept: '*/*' })
      headers.delete('accept')
      expect(headers.get('accept')).toBeNull()
    })
  })

  describe('given deleting a non-existing header', () => {
    it('should do nothing', () => {
      const headers = new Headers({ accept: '*/*' })
      headers.delete('content-type')
      expect(headers.get('accept')).toEqual('*/*')
    })
  })
})

describe('.forEach()', () => {
  describe('given the traversal of each header', () => {
    it('should traverse each header once', () => {
      const headers = new Headers({ accept: '*/*', 'user-agent': 'agent' })
      const headerSet = new Set()

      headers.forEach((value, name, headers) => {
        expect(value).toBe(headers.get(name))
        expect(headerSet.has(name)).toBe(false)
        headerSet.add(name)
      })

      expect(headerSet).toEqual(new Set(['accept', 'user-agent']))
    })
  })

  describe('given the traversal of each header with thisArg', () => {
    it('should traverse each header once, with bind', () => {
      const headers = new Headers({ accept: '*/*', 'user-agent': 'agent' })
      const headerSet = new Set()

      headers.forEach(function (value, name, headers) {
        expect(value).toBe(headers.get(name))
        expect(this.has(name)).toBe(false)
        this.add(name)
      }, headerSet)

      expect(headerSet).toEqual(new Set(['accept', 'user-agent']))
    })
  })
})
