import { useState } from 'react'
import Caco1 from '../assets/caco1.png'
import Caco2 from '../assets/caco2.png'
import Cposc1 from '../assets/cposc1.png'
import Cpose1 from '../assets/cpose1.png'
import Dem2f1 from '../assets/dem2f1.png'
import Dem2g1 from '../assets/dem2g1.png'
import Mumx5 from '../assets/mummx5.png'
import Mum1 from '../assets/mummy1.png'

import { cn } from '../lib/utils'

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
        return selectedGameTypes.includes(gameType) 
          ? <img src={Caco2} alt="DOOM" />
          : <img src={Caco1} alt="DOOM" />
      case 'DOOM 2':
        return selectedGameTypes.includes(gameType) 
          ? <img src={Cpose1} alt="DOOM 2" />
          : <img src={Cposc1} alt="DOOM 2" />
      case 'HEXEN':
        return selectedGameTypes.includes(gameType) 
          ? <img src={Dem2g1} alt="HEXEN" />
          : <img src={Dem2f1} alt="HEXEN" />
      case 'HERETIC':
        return selectedGameTypes.includes(gameType) 
          ? <img src={Mum1} alt="HERETIC" />
          : <img src={Mumx5} alt="HERETIC" />
    }
  }

  return (
    <div className={cn('inline-flex')}>
      {['DOOM', 'DOOM 2', 'HEXEN', 'HERETIC'].map((gameType: GameType) => (
        <div key={gameType} className={cn('w-32', 'h-32')}>
          <button
            className={cn(
              'flex',
              'flex-col',
              'h-64',
              'max-h-64',
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
            {renderIcon(gameType)}

            {gameType}
          </button>
        </div>
      ))}
    </div>
  )
}
