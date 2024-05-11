import { useEffect, useState } from 'react'

import Caco1 from '../assets/caco1.png'
import Caco2 from '../assets/caco2.png'
import Cposc1 from '../assets/cposc1.png'
import Cpose1 from '../assets/cpose1.png'
import Fdmnj0 from '../assets/fdmnj0.png'
import Fdmnk1 from '../assets/fdmnk1.png'
import Mumx5 from '../assets/mummx5.png'
import Mum1 from '../assets/mummy1.png'
import { cn } from '../lib/utils'
import { Label } from './ui/label'

export type GameType = 'DOOM' | 'DOOM 2' | 'HEXEN' | 'HERETIC'

export type GameTypeToggleGroupProps = {
  onSelectedGameTypesChange: (newGameTypes: GameType[]) => void
}

export const GameTypeToggleGroup = ({
  onSelectedGameTypesChange
}: GameTypeToggleGroupProps) => {
  const [selectedGameTypes, setSelectedGameTypes] = useState<GameType[]>([])

  const renderIcon = (gameType: GameType) => {
    switch (gameType) {
      case 'DOOM':
        return selectedGameTypes.includes(gameType) ? (
          <img
            className={cn('w-16', 'h-16', 'transition-all')}
            src={Caco2}
            alt='DOOM'
          />
        ) : (
          <img
            className={cn('w-16', 'h-16', 'grayscale', 'transition-all')}
            src={Caco1}
            alt='DOOM'
          />
        )
      case 'DOOM 2':
        return selectedGameTypes.includes(gameType) ? (
          <img
            className={cn('h-16', 'transition-all')}
            src={Cpose1}
            alt='DOOM 2'
          />
        ) : (
          <img
            className={cn('h-16', 'grayscale', 'transition-all')}
            src={Cposc1}
            alt='DOOM 2'
          />
        )
      case 'HEXEN':
        return selectedGameTypes.includes(gameType) ? (
          <img
            className={cn('h-16', 'transition-all')}
            src={Fdmnk1}
            alt='HEXEN'
          />
        ) : (
          <img
            className={cn('h-16', 'grayscale', 'transition-all')}
            src={Fdmnj0}
            alt='HEXEN'
          />
        )
      case 'HERETIC':
        return selectedGameTypes.includes(gameType) ? (
          <img
            className={cn('h-16', 'transition-all')}
            src={Mum1}
            alt='HERETIC'
          />
        ) : (
          <img
            className={cn('h-16', 'grayscale', 'transition-all')}
            src={Mumx5}
            alt='HERETIC'
          />
        )
    }
  }

  const toggle = (gameType: GameType) => {
    selectedGameTypes.includes(gameType)
      ? setSelectedGameTypes([
          ...selectedGameTypes.filter((g) => g !== gameType)
        ])
      : setSelectedGameTypes([...selectedGameTypes, gameType].filter((a) => a))
  }

  useEffect(() => {
    onSelectedGameTypesChange(selectedGameTypes)
  }, [selectedGameTypes])

  return (
    <div className={cn('flex')}>
      {['DOOM', 'DOOM 2', 'HEXEN', 'HERETIC'].map((gameType: GameType) => (
        <div key={gameType}>
          <button
            className={cn(
              selectedGameTypes.includes(gameType) &&
                'text-orange-500' &&
                'border-orange-500',
              'w-24',
              'flex',
              'flex-col',
              'items-center',
              'border',
              'p-3',
              'dark:hover:border-orange-500'
            )}
            onClick={() => toggle(gameType)}
          >
            {renderIcon(gameType)}
            <Label className={cn("font-['Kode_Mono']", 'mt-3', 'text-lg')}>
              {gameType}
            </Label>
          </button>
        </div>
      ))}
    </div>
  )
}
