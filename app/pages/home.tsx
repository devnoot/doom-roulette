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

  const launchGame = () => {
    window.api.launchOdamex(launchArgs)
  }

  const downloadAndExtract = async (wad) => {
    //window.api.downloadToPath()
    const mirror = `https://youfailit.net/pub/`
    const downloadURL = `${mirror}/idgames/${wad.idgamesurl.replace('idgames://', '')}`

    const archivedFiles = await window.api.downloadToPath(
      downloadURL,
      wad.filename
    )

    const filenames = archivedFiles
      .map((f) => f.fileName)
      .filter((f) => !f.toUpperCase().endsWith('.TXT'))

    const programArgs = []

    programArgs.push('-iwad')
    programArgs.push(`${window.api.iwads}\\${modType.toUpperCase()}.WAD`)
    programArgs.push('-file')
    programArgs.push(
      `${filenames
        .filter((f) => f.toUpperCase().endsWith('.WAD'))
        .map((f) => `${window.api.pwads}\\${f}`)
        .join(' ')}`
    )
    programArgs.push(`-skill`)
    programArgs.push('3')

    if (filenames.filter((f) => f.toUpperCase().endsWith('.DEH'))) {
      const dehFiles = filenames.filter((f) => f.toUpperCase().endsWith('.DEH'))
      dehFiles.forEach((f) => {
        programArgs.push(`-deh `)
        programArgs.push(f)
      })
    }

    if (filenames.filter((f) => f.toUpperCase().endsWith('.BEH'))) {
      const behFiles = filenames.filter((f) => f.toUpperCase().endsWith('.BEH'))
      behFiles.forEach((f) => {
        programArgs.push(`-beh `)
        programArgs.push(f)
      })
    }

    setLaunchArgs(programArgs)
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
      <div className={cn('inline-flex', 'mb-3', 'w-full')}>
        <img
          src={DoomRouletteLogo}
          alt='Doom Roulette'
          className={cn('sm:w-64', 'mb-3', 'aspect-square')}
        />

        <div className={cn('flex', 'flex-col', 'p-5')}>
          <div className={cn('space-y-3')}>
            <div>
              <p className="mb-1 font-['Kode_Mono']">Select base game</p>
              <GameTypeToggleGroup
                onSelectedGameTypesChange={(v) => setSelectedModTypes(v)}
              />
            </div>

            <Button
              size='lg'
              className={cn('w-full')}
              onClick={getRandomWad}
              disabled={loading}
            >
              <Dices className={cn('me-2', loading && 'animate-spin')} />
              Get a new mod
            </Button>

            <Button
              size='lg'
              className={cn('w-full')}
              onClick={launchGame}
              disabled={!canLaunch}
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

            <Button onClick={() => downloadAndExtract(wad)}>Download</Button>

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
