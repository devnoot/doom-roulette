import { ThemeProvider } from './components/theme-provider'

import { Home } from './pages/home'


export const App = () => {
  return (
      <ThemeProvider defaultTheme='dark' storageKey='doom-roulette-theme'>
        <Home />
      </ThemeProvider>
  )
}
