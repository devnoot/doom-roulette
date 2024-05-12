import { Dices } from 'lucide-react'
import { useState } from 'react'

import DoomRouletteLogo from '../assets/doom-roulette.png'
import {
  GameType,
  GameTypeToggleGroup
} from '../components/game-type-toggle-group'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { Rating } from '../components/ui/rating'
import { Skeleton } from '../components/ui/skeleton'
import { UserSettingsDrawer } from '../components/user-settings-menu'
import { useRandomWad } from '../hooks/useRandomWad'
import { cn } from '../lib/utils'

export const Home = () => {
  const [modType, setModType] = useState('doom')

  const [selectedModTypes, setSelectedModTypes] = useState<GameType[]>([])

  const [canLaunch, setCanLaunch] = useState(true)
  const [launchArgs, setLaunchArgs] = useState<string[]>([])

  const { loading, error, wad, getRandomWad } = useRandomWad({
    modType: modType
  })

  return (
    <div
      className={cn(
        'container',
        'mx-auto',
        'min-h-screen',
        'flex',
        'flex-col',
        'items-center',
        'p-10'
      )}
    >
      <div className={cn('flex', 'mb-3')}>
        <img
          src={DoomRouletteLogo}
          alt='Doom Roulette'
          className={cn('sm:w-64', 'mb-3', 'object-contain')}
        />

        <div className={cn('flex', 'flex-col', 'p-6')}>
          <div className='my-5'>
            <p className="font-['Kode_Mono']">Select base game</p>
            <GameTypeToggleGroup
              onSelectedGameTypesChange={(v) => setSelectedModTypes(v)}
            />
          </div>
          <Button
            size='lg'
            variant='outline'
            onClick={getRandomWad}
            disabled={loading}
          >
            <Dices className={cn('me-2', loading && 'animate-spin')} />
            Get a new mod
          </Button>

          <Button size='lg' variant='outline' disabled={!canLaunch}>
            Launch Game with Mod
          </Button>

          {/* <UserSettingsDrawer /> */}
        </div>
      </div>

      {error && <div>{error}</div>}

      {wad ? (
        <Card className={cn('w-full')}>
          <CardHeader>
            <CardTitle>{wad.title}</CardTitle>
            <CardDescription>
              {wad.dir} <strong>{wad.filename}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mb-3'>
              <Rating rating={+wad.rating} />
              <div>{wad.votes} votes</div>
            </div>

            <div>{wad.description}</div>

            <Button>Download</Button>

            {/* <Separator className='my-5' /> */}

            {/* <p>{wad.id}</p>
            <p>{wad.age}</p>
            <p>{wad.date}</p>
            <p>{wad.url}</p>
            <p>{wad.idgamesurl}</p> */}
          </CardContent>
        </Card>
      ) : (
        <Skeleton className={cn('w-[800px]', 'min-h-[200px]')} />
      )}
    </div>
  )
}
