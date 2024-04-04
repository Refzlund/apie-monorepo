import path from 'path'
import build from 'vite-configs/build'

build({
	tsconfigPath: path.resolve('./tsconfig.json'),
	external: ['zod', '@apie/pipe', '@apie/responses', '@apie/utility', '@sveltejs/kit']
}, 'index.ts', 'api.ts')
