import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'ui-vendor': ['lucide-react', 'react-hot-toast'],
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // Feature chunks
          'dashboard': [
            './src/pages/Dashboard.jsx',
            './src/pages/DashboardHome.jsx',
            './src/pages/DashboardHomeOptimized.jsx'
          ],
          'analytics': [
            './src/pages/Analytics.jsx'
          ],
          'admin': [
            './src/pages/admin/AdminDashboard.jsx',
            './src/pages/admin/AdminHome.jsx',
            './src/pages/admin/AdminUserManagement.jsx',
            './src/pages/admin/AdminAnalytics.jsx'
          ],
          'music': [
            './src/pages/MyMusic.jsx',
            './src/pages/UploadMusic.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
      'react-hot-toast'
    ]
  }
})
