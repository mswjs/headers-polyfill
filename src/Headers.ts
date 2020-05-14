const HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i

export class Headers {
  private map: Record<string, string> = {}

  constructor(headers?: any) {
    if (Array.isArray(headers)) {
      headers.forEach(([name, value]) => {
        this.append(name, Array.isArray(value) ? value.join(', ') : value)
      })
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach((name) => {
        this.append(name, headers[name])
      })
    }
  }

  /**
   * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  set(name: string, value: string) {
    this.map[this.normalizeName(name)] = this.normalizeValue(value)
  }

  /**
   * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  append(name: string, value: string) {
    name = this.normalizeName(name)
    value = this.normalizeValue(value)
    this.map[name] = this.has(name) ? `${this.map[name]}, ${value}` : value
  }

  /**
   * Deletes a header from the `Headers` object.
   */
  delete(name: string) {
    delete this.map[this.normalizeName(name)]
    return this
  }

  /**
   * Returns a `ByteString` sequence of all the values of a header with a given name.
   */
  get(name: string): string | null {
    return this.map[name]
  }

  /**
   * Returns the map of all headers in a `Headers` object.
   */
  getAllHeaders(): Record<string, string> {
    return this.map
  }

  /**
   * Returns a boolean stating whether a `Headers` object contains a certain header.
   */
  has(name: string): boolean {
    return this.map.hasOwnProperty(this.normalizeName(name))
  }

  forEach(
    callback: (name: string, value: string, thisArg: this) => void,
    thisArg: this
  ) {
    for (let name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  private normalizeName(name: string): string {
    if (typeof name !== 'string') {
      name = String(name)
    }

    if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === '') {
      throw new TypeError('Invalid character in header field name')
    }

    return name.toLowerCase()
  }

  private normalizeValue(value: any) {
    if (typeof value !== 'string') {
      value = String(value)
    }

    return value
  }
}
