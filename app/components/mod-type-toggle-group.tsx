import { ModType } from '@/lib/idgames'
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

export type ModTypeToggleGroupProps = {
  onSelectedModTypesChange: (newModTypes: ModType[]) => void
  className?: string
}

export const ModTypeToggleGroup = ({
  onSelectedModTypesChange,
  className = ''
}: ModTypeToggleGroupProps) => {
  const [selectedModTypes, setSelectedModTypes] = useState<ModType[]>([])

  const renderIcon = (modType: ModType) => {
    switch (modType) {
      case 'DOOM':
        return selectedModTypes.includes(modType) ? (
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
        return selectedModTypes.includes(modType) ? (
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
        return selectedModTypes.includes(modType) ? (
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
        return selectedModTypes.includes(modType) ? (
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

  const toggle = (modType: ModType) => {
    selectedModTypes.includes(modType)
      ? setSelectedModTypes([...selectedModTypes.filter((g) => g !== modType)])
      : setSelectedModTypes([...selectedModTypes, modType].filter((a) => a))
  }

  useEffect(() => {
    onSelectedModTypesChange(selectedModTypes)
  }, [selectedModTypes])

  return (
    <div className={cn('flex', 'justify-between')}>
      {['DOOM', 'DOOM 2', 'HEXEN', 'HERETIC'].map((modType: ModType) => {
        const isSelected = selectedModTypes.includes(modType)

        return (
          <div key={modType} className={className}>
            <button
              className={cn(
                isSelected && 'border-orange-500',
                'flex',
                'flex-col',
                'items-center',
                'border',
                'p-3',
                'w-24',
                'dark:hover:border-orange-500'
              )}
              onClick={() => toggle(modType)}
            >
              {renderIcon(modType)}
              <Label
                className={cn(
                  "font-['Kode_Mono']",
                  'mt-3',
                  'text-lg',
                  isSelected && 'text-orange-500'
                )}
              >
                {modType}
              </Label>
            </button>
          </div>
        )
      })}
    </div>
  )
}
