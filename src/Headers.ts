import { HeadersList, HeadersObject } from './glossary'
import { normalizeHeaderName } from './utils/normalizeHeaderName'
import { normalizeHeaderValue } from './utils/normalizeHeaderValue'

export default class HeadersPolyfill {
  private _headers: Record<string, string> = {}

  constructor(init?: HeadersInit | HeadersObject | HeadersList) {
    /**
     * @note Cannot check for the `instanceof` as the `Headers` class
     * is only defined in the browser.
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
   * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  set(name: string, value: string) {
    this._headers[normalizeHeaderName(name)] = normalizeHeaderValue(value)
  }

  /**
   * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  append(name: string, value: string) {
    name = normalizeHeaderName(name)
    value = normalizeHeaderValue(value)
    this._headers[name] = this.has(name)
      ? `${this._headers[name]}, ${value}`
      : value
  }

  /**
   * Deletes a header from the `Headers` object.
   */
  delete(name: string) {
    delete this._headers[normalizeHeaderName(name)]
    return this
  }

  /**
   * Returns a `ByteString` sequence of all the values of a header with a given name.
   */
  get(name: string): string | null {
    return this._headers[normalizeHeaderName(name)] || null
  }

  /**
   * Returns the map of all headers in a `Headers` object.
   */
  getAllHeaders(): Record<string, string> {
    return this._headers
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
