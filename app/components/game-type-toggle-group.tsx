import { useState } from 'react'

import { cn } from '../lib/utils'

export type GameType = 'DOOM' | 'DOOM 2' | 'HEXEN' | 'HERETIC'

export type GameTypeToggleGroupProps = {
  onSelectedGameTypesChange: (newGameTypes: GameType[]) => void
}

export const GameTypeToggleGroup = ({
  onSelectedGameTypesChange
}: GameTypeToggleGroupProps) => {
  const [selectedGameTypes, setSelectedGameTypes] = useState<GameType[]>([])

  return (
    <div className={cn('inline-flex')}>
      {['DOOM', 'DOOM 2', 'HEXEN', 'HERETIC'].map((gameType: GameType) => (
        <div key={gameType} className={cn('w-32', 'h-32')}>
          <button
            className={cn(
              'text-4xl',
              selectedGameTypes.includes(gameType) && 'text-blue-500'
            )}
            onClick={() => {
              if (selectedGameTypes.includes(gameType)) {
                setSelectedGameTypes([
                  ...selectedGameTypes.filter((g) => g !== gameType)
                ])
              } else {
                setSelectedGameTypes(
                  [...selectedGameTypes, gameType].filter((a) => a)
                )
              }
            }}
          >
            {gameType}
          </button>
        </div>
      ))}
    </div>
  )
}
