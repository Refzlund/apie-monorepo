# @api

`@api` is a monorepo that contains several packages for handling a REST API in a functional programmatic manner.

However, it is also intended to generally provide typed error responses.

- [`@api/pipe`](./packages/@api-pipe) is the driver of the functional programming structure
- [`@api/responses`](./packages/@api-responses) contains branded responses and is used in conjunction with the other packages
- [`@api/kit`](./packages/@api-kit) is a library for [SvelteKit](https://kit.svelte.dev) that provides type-safety between frontend and backend.<br><sup>(Formerly known as [`sveltekit-zero-api`](https://github.com/Refzlund/sveltekit-zero-api))<sup/>
- [`@api/zod`](./packages/@api-zod) provides functions that utilize [zod](https://npmjs.com/package/zod) used with `@api/kit`

