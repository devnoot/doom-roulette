import { Dices } from 'lucide-react'
import { useState } from 'react'

import DoomRouletteLogo from './assets/doom-roulette.png'
import { Layout } from './components/layout'
import { ModDrawer } from './components/mod-drawer'
import { ModTypeToggleGroup } from './components/mod-type-toggle-group'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
// import { UserSettingsDrawer } from './components/user-settings-menu'
import { File, ModType, getRandomWad } from './lib/idgames'
import { cn } from './lib/utils'

const DoomRouletteBrandImage = () => (
  <img
    src={DoomRouletteLogo}
    alt='Doom Roulette'
    className={cn('object-contain')}
  />
)

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedModTypes, setSelectedModTypes] = useState<ModType[]>([])
  const [mod, setMod] = useState<File>()
  const [modDrawerIsOpen, setModDrawerIsOpen] = useState(false)

  const rollTheDice = async () => {
    try {
      setLoading(true)
      setError('')
      const res = (await getRandomWad({ selectedModTypes })) as File
      setMod(res)
      setModDrawerIsOpen(true)
    } catch (error) {
      setError(error)
      setModDrawerIsOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const RollTheDiceButton = ({ className }: { className: string }) => (
    <Button
      onClick={rollTheDice}
      disabled={loading || selectedModTypes.length === 0}
      className={cn(
        'h-20',
        'text-xl',
        'border',
        'rounded-none',
        'w-full',
        className
      )}
    >
      <Dices className={cn('me-2', loading && 'animate-spin')} />
      Get a new mod
    </Button>
  )

  return (
    <ThemeProvider defaultTheme='dark' storageKey='doom-roulette-theme'>
      <Layout>
        <DoomRouletteBrandImage />
        <ModTypeToggleGroup
          onSelectedModTypesChange={(newSelectedModTypes) =>
            setSelectedModTypes(newSelectedModTypes)
          }
          className='my-8'
        />
        <RollTheDiceButton className='mb-3' />
        <ModDrawer
          mod={mod}
          isOpen={modDrawerIsOpen}
          onOpenChange={setModDrawerIsOpen}
          onClose={() => setMod(undefined)}
        />
        {/* <UserSettingsDrawer /> */}
      </Layout>
    </ThemeProvider>
  )
}
