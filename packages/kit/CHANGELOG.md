# @apie/kit

## 0.7.1

### Patch Changes

- fix: stringifying non-json upon request ([#73](https://github.com/Refzlund/apie-monorepo/pull/73))

## 0.7.0

### Minor Changes

- feat: allow custom content-types by setting endpoint body to the Buffer constructor ([#71](https://github.com/Refzlund/apie-monorepo/pull/71))

- feat: isntead of `await e.json()` access json using `e.body` in endpoints ([#71](https://github.com/Refzlund/apie-monorepo/pull/71))

## 0.6.1

### Patch Changes

- fix: query booleans coerces all strings as true ([#69](https://github.com/Refzlund/apie-monorepo/pull/69))

- fix: ZodUnion and/or ZodEffects not being allowed as endpoint bodies ([#69](https://github.com/Refzlund/apie-monorepo/pull/69))

- fix: invalid query responses lacks a path ([#69](https://github.com/Refzlund/apie-monorepo/pull/69))

## 1.0.0

### Minor Changes

- [BREAKING] feat: `response.body` instead of `await response.json()` for JSON responses ([#67](https://github.com/Refzlund/apie-monorepo/pull/67))

### Patch Changes

- Updated dependencies [[`62b57142dafabcdaecce2b10122af506e4bc2a12`](https://github.com/Refzlund/apie-monorepo/commit/62b57142dafabcdaecce2b10122af506e4bc2a12)]:
  - @apie/responses@1.1.0
  - @apie/pipe@3.0.0

## 0.5.1

### Patch Changes

- fix: use `node:fs` instead of Bun ([#65](https://github.com/Refzlund/apie-monorepo/pull/65))

## 0.5.0

### Minor Changes

- feat: export KitEvent ([#63](https://github.com/Refzlund/apie-monorepo/pull/63))

## 0.4.1

### Patch Changes

- fix: use `fs` instead of `fs/promises` ([#61](https://github.com/Refzlund/apie-monorepo/pull/61))

## 0.4.0

### Minor Changes

- feat: peerDependency on @apie/pipe ([#59](https://github.com/Refzlund/apie-monorepo/pull/59))

### Patch Changes

- Updated dependencies [[`279486d15898e4a861b5a776c6577adafbfe0fa2`](https://github.com/Refzlund/apie-monorepo/commit/279486d15898e4a861b5a776c6577adafbfe0fa2)]:
  - @apie/pipe@2.4.1

## 0.3.1

### Patch Changes

- fix: allow arrays to be body inputs in an endpoint ([#57](https://github.com/Refzlund/apie-monorepo/pull/57))

- fix: treat e.json() as a pipeline ([#57](https://github.com/Refzlund/apie-monorepo/pull/57))

## 0.3.0

### Minor Changes

- feat: add event to endpoint cb (`(pipe, e) => pipe(...)`) ([#55](https://github.com/Refzlund/apie-monorepo/pull/55))

- fix: use `anyPipe` to accept any shape of children ([#55](https://github.com/Refzlund/apie-monorepo/pull/55))

### Patch Changes

- fix: (grouped) routes for generated API ([#55](https://github.com/Refzlund/apie-monorepo/pull/55))

- Updated dependencies [[`fabf353c41f08712f94bd7c92a76f183c3904858`](https://github.com/Refzlund/apie-monorepo/commit/fabf353c41f08712f94bd7c92a76f183c3904858)]:
  - @apie/pipe@2.4.0

## 0.2.0

### Minor Changes

- feat: frontend api, vite-plugin; watch types, typings, endpoint, body/query validation ([#50](https://github.com/Refzlund/apie-monorepo/pull/50))

### Patch Changes

- Updated dependencies [[`ec00eafba71a1d3a6398bc9c4c1f2cc63dad0e40`](https://github.com/Refzlund/apie-monorepo/commit/ec00eafba71a1d3a6398bc9c4c1f2cc63dad0e40), [`ec00eafba71a1d3a6398bc9c4c1f2cc63dad0e40`](https://github.com/Refzlund/apie-monorepo/commit/ec00eafba71a1d3a6398bc9c4c1f2cc63dad0e40)]:
  - @apie/pipe@2.2.0
