[![Published version](https://img.shields.io/npm/v/headers-utils.svg)](https://www.npmjs.com/package/headers-utils)
[![Build status](https://img.shields.io/circleci/project/github/mswjs/headers-utils/master.svg)](https://npmjs.com/package/headers-utils)

# `headers-utils`

Utilities for working with a `Headers` instance.

## Motivation

Various request issuing libraries utilize a different format of headers. This library chooses the [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance as the middle-ground between server and client, and provides functions to convert that instance to primitives and vice-versa.

## Getting started

```bash
$ npm install headers-utils
```

## Headers ⭢ N

#### `headersToString: (h: Headers): string`

```js
headersToString(
  new Headers({
    connection: 'keep-alive',
    'content-type': ['text/plain', 'image/png'],
  })
)
// connetion: keep-alive
// content-type: text/plain, image/png
```

#### `headersToList: (h: Headers): Array<[string, string | string[]]>`

```js
headersToList(
  new Headers({
    connection: 'keep-alive',
    'content-type': ['text/plain', 'image/png'],
  })
)
// [['connection', 'keep-alive'], ['content-type', ['text/plain', 'image/png']]]
```

#### `headersToObject: (h: Headers): Record<string, string | string[]>`

```js
headersToObject(
  new Headers({
    connection: 'keep-alive',
    'content-type': ['text/plain', 'image/png'],
  })
)
// { connection: 'keep-alive', 'content-type': ['text/plain', 'image/png'] }
```

## N ⭢ Headers

#### `stringToHeaders: (s: string): Headers`

```js
const stringToHeaders(`
connection: keep-alive
content-type: text/plain, image/png
`)
// Headers { connection: 'keep-alive', 'content-type': ['text/plain', 'image/png'] }
```

#### `listToHeaders: (l: Array<[string, string | string[]]>): Headers`

```js
listToHeaders([
  ['connection', 'keep-alive'],
  ['content-type', ['text/plain', 'image/png']],
])
// Headers { connection: 'keep-alive', 'content-type': ['text/plain', 'image/png'] }
```

#### `objectToHeaders: (o: Record<string, string | string[]>): Headers`

```js
objectToHeaders({
  connection: 'keep-alive',
  'content-type': ['text/plain', 'image/png'],
})
// Headers { connection: 'keep-alive', 'content-type': ['text/plain', 'image/png'] }
```

---

## Utilities

#### `reduceHeadersObject: <R>(o: Record<string, string | string[]>, reducer: (acc: R, name: string, value: string | string[]) => R) => R`

```js
reduceHeadersObject <
  HeadersObject >
  ({
    Accept: '*/*',
    'Content-Type': ['application/json', 'text/plain'],
  },
  (headers, name, value) => {
    headers[name.toLowerCase()] = value
    return headers
  },
  {})
// { 'accept': '*/*', 'content-type': ['application/json', 'text/plain'] }
```

#### `appendHeader: (o: Record<string, string | string[]>, n: string, v: string | string[]): Record<string, string | string[]>`

```js
appendHeader(
  { 'content-type': 'application/json' },
  'content-type',
  'text/plain'
)
// { 'content-type': ['application/json', 'text/plain']}
```

#### `flattenHeadersList: (l: Array<[string, string | string[]]>): Array<string, string>`

```js
flattenHeadersList([['content-type', ['text/plain', 'image/png']]])
// ['content-type', 'text/plain; image/png']
```

#### `flattenHeadersObject: (o: Record<string, string | string[]>): Record<string, string>`

```js
flattenHeadersObject({
  'content-type': ['text/plain', 'image/png'],
})
// { 'content-type': 'text/plain; image/png' }
```
