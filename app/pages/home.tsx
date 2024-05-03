import { Dices } from 'lucide-react'
import { useState } from 'react'
import DoomRouletteLogo from '../assets/doom-roulette.png'
import { ModTypeSelect } from '../components/mod-type-select'
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

  const { loading, error, wad, getRandomWad } = useRandomWad({
    modType: modType
  })

  const launchGame = () => {
    window.api.launchOdamex()
  }

  const download = (wad) => {
    //window.api.downloadToPath()
    const downloadURL = `https://doomworld.com/idgames/${wad.idgamesurl.replace('idgames://', '')}`
    const a = createElement('a')
    
    console.log(wad, downloadURL)
    
  }

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
      <div className={cn('inline-flex', 'mb-3')}>
        <img
          src={DoomRouletteLogo}
          alt='Doom Roulette'
          className={cn('sm:w-64', 'mb-3')}
        />

        <div className={cn('flex', 'flex-col', 'p-5')}>
          <div className={cn('flex-1', 'space-y-3')}>
            <ModTypeSelect
              onValueChange={(newValue) => setModType(newValue)}
              value={modType}
              defaultValue='doom'
            />
            <Button
              size='lg'
              className={cn(
                'w-full',
                'transition',
                'ease-in-out',
                'delay-150',
                'hover:scale-110',
                'duration-300'
              )}
              onClick={getRandomWad}
              disabled={loading}
            >
              <Dices className={cn('me-2', loading && 'animate-spin')} />
              Get a new mod
            </Button>

            <Button
              size="lg"
              className={cn(
                'w-full',
                'hover:scale-110',
                'ease-in-out',
                'transition',
                'delay-150',
                'duration-300'
              )}
              onClick={launchGame}
              disabled={!wad || loading}
            >
              Launch Game with Mod 
            </Button>
          </div>

          <UserSettingsDrawer />
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

            <Button onClick={() => download(wad)}>Download</Button>

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
