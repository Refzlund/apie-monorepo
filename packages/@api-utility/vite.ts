import path from 'path'
import build from 'vite-configs/build'

build({ tsconfigPath: path.resolve(import.meta.dir, './tsconfig.json')},
	'types/index.ts'
)