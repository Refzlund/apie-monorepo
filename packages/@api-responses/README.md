<h1 align='center' vertical-align='baseline' >
@api/pipe
<small>
<a href='https://www.npmjs.com/package/@api/responses' vertical-align='bottom' >
	<img src='https://img.shields.io/github/v/release/refzlund/api-monorepo?style=social&label=RELEASE&labelColor=8a0000&color=FF0000' alt='NPM Package'/>
</a>
</small>
</h1>
<h3 align="center">

<a href='https://github.com/refzlund/api-monorepo/actions/workflows/main.yml/badge.svg'>
	<img src='https://github.com/refzlund/api-monorepo/actions/workflows/main.yml/badge.svg' alt='Linting & Tests'/>
</a>

<a href='https://semver.org'>
	<img src='https://img.shields.io/badge/Semantic_Versioning-v2-orange' alt='Semantic Versioning V2'/>
</a>

<a href='https://www.paypal.com/paypalme/refzlund'>
	<img src='https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal' alt='Donation Link'/>
</a>

<br/>

</h3>

### What is @api and @api/responses?

An eco-system for infrastructure around REST API. It's worth noting that it is designed so that it can be used in all applications besides a REST API.

`@api/responses` provides typed HTTP responses such as 200: OK. 

Look at [./src/types](./src/types.ts) to see "supported" HTTP statuses.

### Examples

#### `getBody`

When working with a response, you can directly get the body via `getBody`.

It's worth noting, it doesn't work if this response is sent to ex. a frontend.\n
Each responses stores `response._body` which is the RAW version of its content.

```ts
import { OK, getBody } from '@api/responses'

const response = OK({ value: 123 })
getBody(response) // => { value: 123 }
```

#### `isResponse`

You can check if you have a response:

```ts
import { OK, isResponse } from '@api/responses'

const response = OK({ value: 123 })
if(isResponse(response)) {
	// ...
}
```

The reason we do this, is because `response instance Response` will simplify the type to `APIResponse` which is generic for the responses of `@api/responses`.