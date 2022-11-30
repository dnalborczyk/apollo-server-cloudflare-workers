import { env } from 'node:process'
import { build } from 'esbuild'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

const isProd = env.NODE_ENV === 'production'

try {
  await build({
    bundle: true,
    entryPoints: ['./src/index.ts'],
    format: 'esm',
    minify: isProd,
    outdir: 'build',
    plugins: [
      NodeGlobalsPolyfillPlugin({
        buffer: true,
      }),
      NodeModulesPolyfillPlugin(),
    ],
    sourcemap: true,
  })
} catch {
  process.exit(1)
}
