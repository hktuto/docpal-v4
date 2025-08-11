/* eslint-disable */
const fs = require('fs')
const path = require('path')

function findModuleWasm() {
  // pnpm hoists in a nested structure; search upwards for the module
  const candidates = [
    path.resolve(__dirname, '../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm'),
    path.resolve(__dirname, '../../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm'),
    path.resolve(__dirname, '../../../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm')
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error('Could not locate @sqlite.org/sqlite-wasm/sqlite3.wasm in node_modules')
}

function findModuleMjs() {
  const candidates = [
    path.resolve(__dirname, '../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.mjs'),
    path.resolve(__dirname, '../../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.mjs'),
    path.resolve(__dirname, '../../../../node_modules/.pnpm/@sqlite.org+sqlite-wasm@3.50.3-build1/node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.mjs')
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error('Could not locate @sqlite.org/sqlite-wasm/sqlite3.mjs in node_modules')
}

function main() {
  try {
    const src = findModuleWasm()
    const destDir = path.resolve(__dirname, '../public/workers')
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
    const wasmDest = path.join(destDir, 'sqlite3.wasm')
    fs.copyFileSync(src, wasmDest)

    const mjsSrc = findModuleMjs()
    const mjsDest = path.join(destDir, 'sqlite3.mjs')
    fs.copyFileSync(mjsSrc, mjsDest)

    console.log(`[sql-store] Copied sqlite3.wasm and sqlite3.mjs to ${destDir}`)
  } catch (e) {
    console.warn('[sql-store] Warning:', e.message)
  }

  // Standalone demo copying removed; Nuxt serves /public/sqlite3.wasm
}

main()


