# @apie/pipe

## 2.0.1

### Patch Changes

- fix: `saveResult` overrides existing value ([#40](https://github.com/Refzlund/apie-monorepo/pull/40))

## 2.0.0

### Major Changes

- breaking: pipe will now throw errors, instead of catching them and returning `InternalServerError` - as that should be handled by the Backend framework ([#37](https://github.com/Refzlund/apie-monorepo/pull/37))

- breaking: replaced `(e,v) => pipe.nested(...)` with just using `(e,v) => pipe(...)` ([#37](https://github.com/Refzlund/apie-monorepo/pull/37))

## 1.2.0

### Minor Changes

- feat: NestedPipe - use nested pipes within pipes via `pipe.nested(...)` ([#35](https://github.com/Refzlund/apie-monorepo/pull/35))

### Patch Changes

- Updated dependencies [[`652eeba6d334838629809292552e1af7016c91ec`](https://github.com/Refzlund/apie-monorepo/commit/652eeba6d334838629809292552e1af7016c91ec)]:
  - @apie/utility@1.2.0
  - @apie/responses@1.0.0

## 1.1.7

### Patch Changes

- fix: input type is never for pipeline ([#32](https://github.com/Refzlund/apie-monorepo/pull/32))

- Updated dependencies [[`6d3081a6576f10de883ad69710b12c1daab8f7ba`](https://github.com/Refzlund/apie-monorepo/commit/6d3081a6576f10de883ad69710b12c1daab8f7ba)]:
  - @apie/utility@1.1.0
  - @apie/responses@1.0.0

## 1.1.6

### Patch Changes

- refactor: move `Nil` brand-type to `@apie/utility` ([#30](https://github.com/Refzlund/apie-monorepo/pull/30))

- fix: exclude `APIResponse` from the return value in a pipe ([#30](https://github.com/Refzlund/apie-monorepo/pull/30))

- Updated dependencies [[`397bb68f00e763371e6f8aefb5964d9ee75ae01e`](https://github.com/Refzlund/apie-monorepo/commit/397bb68f00e763371e6f8aefb5964d9ee75ae01e)]:
  - @apie/utility@1.0.3
  - @apie/responses@1.0.0

## 1.1.5

### Patch Changes

- fix: cannot use a function to define pipeline input ([#28](https://github.com/Refzlund/apie-monorepo/pull/28))

## 1.1.4

### Patch Changes

- fix: simplifies return value in pipe ([#26](https://github.com/Refzlund/apie-monorepo/pull/26))

- Updated dependencies [[`c241c70a3ac22c9975acb7c8bc3f60bef3e4f47d`](https://github.com/Refzlund/apie-monorepo/commit/c241c70a3ac22c9975acb7c8bc3f60bef3e4f47d)]:
  - @apie/utility@1.0.2
  - @apie/responses@1.0.0

## 1.1.3

### Patch Changes

- fix: do not simplify return values ([#24](https://github.com/Refzlund/apie-monorepo/pull/24))

## 1.1.2

### Patch Changes

- fix: saveResult returns APIResponses ([#21](https://github.com/Refzlund/apie-monorepo/pull/21))

## 1.1.1

### Patch Changes

- fix: pipeline Promises `any` if the pipeline has a non-function parameter ([#19](https://github.com/Refzlund/apie-monorepo/pull/19))

## 1.1.0

### Minor Changes

- feat: saveResult - save results to reuse later in a pipeline ([#18](https://github.com/Refzlund/apie-monorepo/pull/18))

### Patch Changes

- fix: input value not working if the previous pipe param is a function defined somewhere else ([#16](https://github.com/Refzlund/apie-monorepo/pull/16))

## 1.0.1

### Patch Changes

- fix: pipe functions do not pass through correct input type ([#14](https://github.com/Refzlund/apie-monorepo/pull/14))

- Updated dependencies [[`97b030ccafb78606eea0e26fcb19177d3d025e80`](https://github.com/Refzlund/apie-monorepo/commit/97b030ccafb78606eea0e26fcb19177d3d025e80)]:
  - @apie/utility@1.0.1
  - @apie/responses@1.0.0

## 1.0.0

### Major Changes

- Initial release version of @apie provides the pipe functions (via @apie/pipe), typed HTTP responses (via @apie/responses), and utility functions that this eco-system needs (via @apie/utility) ([#10](https://github.com/Refzlund/apie-monorepo/pull/10))

### Patch Changes

- Updated dependencies [[`36cad7854c1f03db5ba77474a4af422d212d53ff`](https://github.com/Refzlund/apie-monorepo/commit/36cad7854c1f03db5ba77474a4af422d212d53ff)]:
  - @apie/responses@1.0.0
  - @apie/utility@1.0.0
