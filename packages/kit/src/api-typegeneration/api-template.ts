export default
`import { createAPI } from '@apie/kit/api'
import type { GeneratedAPI } from './.generated-api'

const routes = createAPI<GeneratedAPI>()

export default routes.api`