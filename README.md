[![Published version](https://img.shields.io/npm/v/headers-utils.svg)](https://www.npmjs.com/package/headers-util)
[![Build status](https://img.shields.io/circleci/project/github/mswjs/headers-utils/master.svg)](https://npmjs.com/package/headers-utils)

# `headers-utils`

Utilities for working with a `Headers` instance.

## Motivation

Various request issuing libraries expect a different format of headers. This library chooses the [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance as the middle-ground between server and client, and provides transformer functions to convert that instance to primitives, or vice-versa.

## Getting started

```bash
$ npm install headers-utils
```

## API

### Conversion

- `headersToList: (h: Headers): Array<[string, string | string[]]>`
- `headersToObject: (h: Headers): Record<string, string | string[]>`
- `listToHeaders: (l: Array<[string, string | string[]]>): Headers`
- `objectToHeaders: (o: Record<string, string | string[]>): Headers`

### Transformation

- `flattenHeadersList: (l: Array<[string, string | string[]]>): Array<string, string>`
- `flattenHeadersObject: (o: Record<string, string | string[]>): Record<string, string>`
