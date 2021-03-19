import { HeadersList, HeadersObject } from './glossary'
import { normalizeHeaderName } from './utils/normalizeHeaderName'
import { normalizeHeaderValue } from './utils/normalizeHeaderValue'

export default class HeadersPolyfill {
  // Normalized header {"name":"a, b"} storage.
  private _headers: Record<string, string> = {}

  // Keeps the mapping between the raw header name
  // and the normalized header name to ease the lookup.
  private _names: Map<string, string> = new Map()

  constructor(init?: HeadersInit | HeadersObject | HeadersList) {
    /**
     * @note Cannot check if the `init` is an instance of the `Headers`
     * because that class is only defined in the browser.
     */
    if (init?.constructor.name === 'Headers') {
      const initialHeaders = init as Headers
      initialHeaders.forEach((value, name) => {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(init)) {
      init.forEach(([name, value]) => {
        this.append(name, Array.isArray(value) ? value.join(', ') : value)
      })
    } else if (init) {
      Object.getOwnPropertyNames(init).forEach((name) => {
        const value = init[name]
        this.append(name, Array.isArray(value) ? value.join(', ') : value)
      })
    }
  }

  [Symbol.iterator]() {
    return this.entries()
  }

  *keys(): IterableIterator<string> {
    for (const name of Object.keys(this._headers)) {
      yield name
    }
  }

  *values(): IterableIterator<string> {
    for (const value of Object.values(this._headers)) {
      yield value
    }
  }

  *entries(): IterableIterator<[string, string]> {
    for (const name of Object.keys(this._headers)) {
      yield [name, this.get(name)]
    }
  }

  /**
   * Returns a `ByteString` sequence of all the values of a header with a given name.
   */
  get(name: string): string | null {
    return this._headers[normalizeHeaderName(name)] || null
  }

  /**
   * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  set(name: string, value: string) {
    const normalizedName = normalizeHeaderName(name)
    this._headers[normalizedName] = normalizeHeaderValue(value)
    this._names.set(normalizedName, name)
  }

  /**
   * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  append(name: string, value: string) {
    const resolvedValue = this.has(name) ? `${this.get(name)}, ${value}` : value
    this.set(name, resolvedValue)
  }

  /**
   * Deletes a header from the `Headers` object.
   */
  delete(name: string) {
    if (!this.has(name)) {
      return this
    }

    const normalizedName = normalizeHeaderName(name)
    delete this._headers[normalizedName]
    this._names.delete(normalizedName)
    return this
  }

  /**
   * Returns the map of all the headers.
   */
  getAllHeaders(): Record<string, string> {
    return this._headers
  }

  /**
   * Returns the map of all the raw headers.
   */
  getRawHeaders(): Record<string, string> {
    return Object.entries(this._headers).reduce((headers, [name, value]) => {
      headers[this._names.get(name)] = value
      return headers
    }, {})
  }

  /**
   * Returns a boolean stating whether a `Headers` object contains a certain header.
   */
  has(name: string): boolean {
    return this._headers.hasOwnProperty(normalizeHeaderName(name))
  }

  /**
   * Traverses the `Headers` object,
   * calling the given callback for each header.
   */
  forEach<ThisArg = this>(
    callback: (
      this: ThisArg,
      value: string,
      name: string,
      parent: this
    ) => void,
    thisArg?: ThisArg
  ) {
    for (const name in this._headers) {
      if (this._headers.hasOwnProperty(name)) {
        callback.call(thisArg, this._headers[name], name, this)
      }
    }
  }
}
