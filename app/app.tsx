import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Home } from './pages/home'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='doom-roulette-theme'>
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
