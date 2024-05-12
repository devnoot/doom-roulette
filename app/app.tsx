import { Dices } from 'lucide-react'
import { ReactNode } from 'react'

import DoomRouletteLogo from './assets/doom-roulette.png'
import { GameTypeToggleGroup } from './components/game-type-toggle-group'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { UserSettingsDrawer } from './components/user-settings-menu'
import { useRandomWad } from './hooks/useRandomWad'
import { cn } from './lib/utils'

const DoomRouletteBrandImage = () => (
  <img
    src={DoomRouletteLogo}
    alt='Doom Roulette'
    className={cn('object-contain')}
  />
)

export const App = () => {
  const { loading, error, wad, getRandomWad } = useRandomWad({
    modType: ''
  })

  const RollTheDiceButton = ({ className }: { className: string }) => (
    <Button
      onClick={getRandomWad}
      disabled={loading}
      className={cn('h-20', 'text-xl', 'border', 'rounded-none', className)}
    >
      <Dices className={cn('me-2', loading && 'animate-spin')} />
      Get a new mod
    </Button>
  )

  return (
    <ThemeProvider defaultTheme='dark' storageKey='doom-roulette-theme'>
      <Layout>
        <DoomRouletteBrandImage />
        <GameTypeToggleGroup
          onSelectedGameTypesChange={console.log}
          className='my-8'
        />
        <RollTheDiceButton className='mb-3' />
        <UserSettingsDrawer />
      </Layout>
    </ThemeProvider>
  )
}

type LayoutProps = {
  children: ReactNode | ReactNode[]
}

export const Layout = ({ children }: LayoutProps) => (
  <div
    className={cn(
      'flex',
      'flex-col',
      'container',
      'max-w-[420px]',
      'justify-center'
    )}
  >
    {children}
  </div>
)
