import path from 'path'
import build from 'vite-configs/build'

build({
	tsconfigPath: path.resolve('./tsconfig.json')
}, 'index.ts', 'api.ts')
