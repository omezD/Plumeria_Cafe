import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const FRAMES_DIR = join(import.meta.dirname, 'public', 'frames')
const FRAME_EXT = /\.(webp|avif|jpe?g|png|svg)$/i

// GitHub Pages serves a project site at /<repo-name>/. The deploy workflow sets
// PAGES_REPO to that name; everywhere else the site is built for the root.
const base = process.env.PAGES_REPO ? `/${process.env.PAGES_REPO}/` : '/'

// Exposes `virtual:hero-frames`: the URLs of every image in public/frames,
// in filename order. Frames are served from /public rather than imported
// because this project lives under a folder with "#" in its name, which
// Vite's asset pipeline cannot read.
function heroFrames() {
  const id = 'virtual:hero-frames'
  const resolved = '\0' + id

  const list = () =>
    existsSync(FRAMES_DIR)
      ? readdirSync(FRAMES_DIR)
          .filter((f) => FRAME_EXT.test(f))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((f) => `${base}frames/${encodeURIComponent(f)}`)
      : []

  return {
    name: 'hero-frames',
    resolveId: (source) => (source === id ? resolved : null),
    load: (source) => (source === resolved ? `export default ${JSON.stringify(list())}` : null),
    configureServer(server) {
      const refresh = (file) => {
        if (!file.startsWith(FRAMES_DIR)) return
        const mod = server.moduleGraph.getModuleById(resolved)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(FRAMES_DIR)
      server.watcher.on('add', refresh).on('unlink', refresh)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), heroFrames()],
})
