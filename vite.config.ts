import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: repositoryName && !repositoryName.endsWith('.github.io') ? `/${repositoryName}/` : '/',
  plugins: [react()],
})
