import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { query } from './lib/react-query'
import { router } from './routes'
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />

        <QueryClientProvider client={query}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
