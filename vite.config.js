import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Mobile devices ke liye server accessible banata hai
    port: 5173,      // Port number, aap change kar sakte hain
    open: true,      // Server start hone ke baad browser khulega (optional)
  },
  plugins: [react()],
})
