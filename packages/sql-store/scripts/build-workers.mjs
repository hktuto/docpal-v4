import { build } from 'esbuild'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = resolve(__dirname, '..')
const outDir = resolve(root, 'public/workers')
mkdirSync(outDir, { recursive: true })

const workers = [
  { entry: resolve(root, 'workers/sqlite.shared-worker.ts'), outfile: resolve(outDir, 'sqlite.shared-worker.js') },
  { entry: resolve(root, 'workers/sqlite.worker.ts'), outfile: resolve(outDir, 'sqlite.worker.js') }
]

for (const { entry, outfile } of workers) {
  await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outfile,
    minify: false,
    sourcemap: false,
    target: ['es2020'],
    external: ['./sqlite3.mjs']
  })
  console.log(`[sql-store] built worker ${outfile}`)
}
