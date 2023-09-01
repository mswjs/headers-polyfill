import setCookieParser from 'set-cookie-parser'
import { HeadersList, HeadersObject } from './glossary'
import { normalizeHeaderName } from './utils/normalizeHeaderName'
import { normalizeHeaderValue } from './utils/normalizeHeaderValue'

const NORMALIZED_HEADERS: unique symbol = Symbol('normalizedHeaders')
const RAW_HEADER_NAMES: unique symbol = Symbol('rawHeaderNames')
const HEADER_VALUE_DELIMITER = ', ' as const

export default class HeadersPolyfill {
  // Normalized header {"name":"a, b"} storage.
  private [NORMALIZED_HEADERS]: Record<string, string> = {}

  // Keeps the mapping between the raw header name
  // and the normalized header name to ease the lookup.
  private [RAW_HEADER_NAMES]: Map<string, string> = new Map()

  constructor(init?: HeadersInit | HeadersObject | HeadersList) {
    /**
     * @note Cannot check if the `init` is an instance of the `Headers`
     * because that class is only defined in the browser.
     */
    if (
      ['Headers', 'HeadersPolyfill'].includes(init?.constructor.name) ||
      init instanceof HeadersPolyfill
    ) {
      const initialHeaders = init as Headers
      initialHeaders.forEach((value, name) => {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(init)) {
      init.forEach(([name, value]) => {
        this.append(
          name,
          Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value
        )
      })
    } else if (init) {
      Object.getOwnPropertyNames(init).forEach((name) => {
        const value = init[name]
        this.append(
          name,
          Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value
        )
      })
    }
  }

  [Symbol.iterator]() {
    return this.entries()
  }

  *keys(): IterableIterator<string> {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield name
    }
  }

  *values(): IterableIterator<string> {
    for (const value of Object.values(this[NORMALIZED_HEADERS])) {
      yield value
    }
  }

  *entries(): IterableIterator<[string, string]> {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield [name, this.get(name)]
    }
  }

  /**
   * Returns a `ByteString` sequence of all the values of a header with a given name.
   */
  get(name: string): string | null {
    return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null
  }

  /**
   * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  set(name: string, value: string): void {
    const normalizedName = normalizeHeaderName(name)
    this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(value)
    this[RAW_HEADER_NAMES].set(normalizedName, name)
  }

  /**
   * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
   */
  append(name: string, value: string): void {
    const normalizedName = normalizeHeaderName(name)
    let resolvedValue = this.has(normalizedName)
      ? `${this.get(normalizedName)}, ${value}`
      : value

    this.set(name, resolvedValue)
  }

  /**
   * Deletes a header from the `Headers` object.
   */
  delete(name: string): void {
    if (!this.has(name)) {
      return
    }

    const normalizedName = normalizeHeaderName(name)
    delete this[NORMALIZED_HEADERS][normalizedName]
    this[RAW_HEADER_NAMES].delete(normalizedName)
  }

  /**
   * Returns the object of all the normalized headers.
   */
  all(): Record<string, string> {
    return this[NORMALIZED_HEADERS]
  }

  /**
   * Returns the object of all the raw headers.
   */
  raw(): Record<string, string> {
    const rawHeaders: Record<string, string> = {}

    for (const [name, value] of this.entries()) {
      rawHeaders[this[RAW_HEADER_NAMES].get(name)] = value
    }

    return rawHeaders
  }

  /**
   * Returns a boolean stating whether a `Headers` object contains a certain header.
   */
  has(name: string): boolean {
    return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name))
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
    for (const name in this[NORMALIZED_HEADERS]) {
      if (this[NORMALIZED_HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[NORMALIZED_HEADERS][name], name, this)
      }
    }
  }

  /**
   * Returns an array containing the values
   * of all Set-Cookie headers associated
   * with a response
   */
  getSetCookie(): string[] {
    const setCookieHeader = this.get('set-cookie')

    if (setCookieHeader === null) {
      return []
    }

    if (setCookieHeader === '') {
      return ['']
    }

    return setCookieParser.splitCookiesString(setCookieHeader)
  }
}
