![https://www.npmjs.com/package/headers-utils](https://img.shields.io/npm/v/headers-utils.svg)
![https://app.circleci.com/pipelines/github/mswjs/headers-utils](https://img.shields.io/circleci/project/github/mswjs/headers-utils/master.svg)

# `headers-utils`

Utilities for working with a `Headers` instance.

## Motivation

Various request issuing libraries expect a different format of headers. This library chooses the [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance as the middle-ground between server and client, and provides transformer functions to convert that instance to primitives, or vice-versa.

## API

- `headersToList: (h: Headers): Array<[string, string | string[]]>`
- `headersToObject: (h: Headers): Record<string, string | string[]>`
- `listToHeaders: (l: Array<[string, string | string[]]>): Headers`
- `objectToHeaders: (o: Record<string, string | string[]>): Headers`
