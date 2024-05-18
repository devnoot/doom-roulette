import { MouseEventHandler } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import { Rating } from './ui/rating';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { File } from '../lib/idgames'
import CountUp from 'react-countup'

export type ModDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onClose: MouseEventHandler<HTMLButtonElement>
  mod: File
}


export const ModDialog = ({
  isOpen,
  onOpenChange,
  onClose,
  mod
}: ModDialogProps) => {

  const onDownloadClick = (mod: File) => {
    const a = document.createElement('a')
    const mirror = `https://youfailit.net/pub/`
    const downloadURL = `${mirror}/idgames/${mod.idgamesurl.replace('idgames://', '')}`
    a.href = downloadURL
    a.style.display = 'none'
    a.click()
  }

  const onIdGamesButtonClick = (mod: File) => {
    const a = document.createElement('a')
    a.href = mod.url 
    a.target = "_blank"
    a.style.display = 'none'
    a.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>
              <strong>{mod?.title}</strong>{mod?.author  && " by " + mod?.author}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className={cn('flex', 'justify-between', 'mb-2', 'items-center')}>
            <p className={cn('flex', 'flex-col', "font-['Kode_Mono']")}>
                <span className="text-lg">{mod?.votes.toString() === '0' ? 'No' : <CountUp start={0} end={+mod?.votes} />}</span>
                <span>votes</span>
            </p>
            <div>
                <Rating rating={+mod?.rating} />
            </div>
        </div>

        <div>

        <div className={cn("max-h-[420px]", 'border', 'rounded', 'overflow-y-scroll', 'mb-5', 'p-3', 'min-h-32')}>
          <p>
            {mod?.description
              ? mod?.description
              : 'No description available for this mod'}
          </p>
        </div>

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

          <Button className={cn('w-full')} size="sm" variant="link" onClick={() => onIdGamesButtonClick(mod)}>Check it out on the igames archive</Button>
        </div>
      </DialogContent>

    </Dialog>
  );
};