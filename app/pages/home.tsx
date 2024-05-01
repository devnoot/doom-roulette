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
import { Separator } from '../components/ui/separator'
import { Skeleton } from '../components/ui/skeleton'
import { UserSettingsDrawer } from '../components/user-settings-menu'
import { useRandomWad } from '../hooks/useRandomWad'
import { cn } from '../lib/utils'
import { Dices } from 'lucide-react'
import { useState } from 'react'
import { CopyBlock, googlecode } from 'react-code-blocks'
import { useLocalStorage } from 'react-use'

export const Home = () => {
  const [modType, setModType] = useState('doom')
  const [odamexRunCommand, setOdamexRunCommand] = useState('')
  const [gzdoomRunCommand, setGzdoomRunCommand] = useState('')

  const [odamexPath, setOdamexPath, removeOdamexPath] = useLocalStorage(
    'odamex-path',
    ''
  )
  const [gzdoomPath, setGzdoomPath, removeGzdoomPath] = useLocalStorage(
    'gzdoom-path',
    ''
  )

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
          </div>

          <UserSettingsDrawer />
        </div>
      </div>

      {error && <div>{error}</div>}

      {wad ? (
        <Card className={cn('w-[800px]', 'h-[600px]')}>
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

            <Separator className='my-5' />

            <div className={cn('space-y-2')}>
              {odamexPath && odamexPath !== '' && (
                <div>
                  <p>Copy and run this command to run Odamex with this mod</p>
                  <CopyBlock
                    text={odamexRunCommand}
                    showLineNumbers={false}
                    theme={googlecode}
                    language={
                      odamexPath.includes('.exe') ? 'powershell' : 'shell'
                    }
                  />
                </div>
              )}

              {gzdoomPath && gzdoomPath !== '' && (
                <div>
                  <p>Copy and run this command to run Gzdoom with this mod</p>
                  <CopyBlock
                    text={gzdoomRunCommand}
                    showLineNumbers={false}
                    theme={googlecode}
                    language={
                      gzdoomPath.includes('.exe') ? 'powershell' : 'shell'
                    }
                  />
                </div>
              )}
            </div>

            {/* <p>{wad.id}</p>
            <p>{wad.age}</p>
            <p>{wad.date}</p>
            <p>{wad.url}</p>
            <p>{wad.idgamesurl}</p> */}
          </CardContent>
        </Card>
      ) : (
        <Skeleton className={cn('w-[800px]', 'h-[600px]')} />
      )}
    </div>
  )
}
