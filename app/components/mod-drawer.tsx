import { MouseEventHandler } from 'react'

import { File } from '../lib/idgames'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer'
import { Rating } from './ui/rating'

export type ModDrawerProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onClose: MouseEventHandler<HTMLButtonElement>
  mod: File
}

export const ModDrawer = ({
  isOpen,
  onOpenChange,
  onClose,
  mod
}: ModDrawerProps) => {

  const onDownloadClick = (mod: File) => {
    const a = document.createElement('a')
    const mirror = `https://youfailit.net/pub/`
    const downloadURL = `${mirror}/idgames/${mod.idgamesurl.replace('idgames://', '')}`
    a.href = downloadURL
    a.style.display = 'none'
    a.click()
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className={cn('max-w-[420px]', 'mx-auto')}>
        <DrawerHeader>
          <DrawerTitle className={cn("font-['Kode_Mono']")}>
            <p className='mb-3'>
              <strong>{mod?.title}</strong> by {mod?.author}
            </p>
            <div className={cn('flex', 'justify-between')}>
              <Rating rating={+mod?.rating} />
              <p>
                <small>{mod?.votes} votes</small>
              </p>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div className={cn('px-5', 'space-y-8')}>
          <p>
            {mod?.description
              ? mod?.description
              : 'No description available for this mod'}
          </p>
          <Button
            className={cn(
              'h-16',
              'w-full',
              'bg-amber-600',
              'text-white',
              'hover:bg-amber-400',
              'cursor-pointer'
            )}
            onClick={() => onDownloadClick(mod)}
          >
            Download Mod
          </Button>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' onClick={onClose}>
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
