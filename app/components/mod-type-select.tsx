import { Label } from '../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select'
import { cn } from '../lib/utils'
import { SelectProps } from '@radix-ui/react-select'

export type ModTypeSelectProps = {
  onValueChange: (newValue: string) => void
  defaultValue: string
  value: string
} & SelectProps

export const ModTypeSelect = ({
  onValueChange,
  defaultValue,
  value,
  ...rest
}: ModTypeSelectProps) => {
  return (
    <div className={cn('flex', 'flex-col')}>
      <Label htmlFor='mod-select-field' className='mb-1'>
        Select base game
      </Label>
      <Select
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        value={value}
        {...rest}
      >
        <SelectTrigger className='w-64'>
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='doom'>Doom</SelectItem>
          <SelectItem value='doom2'>Doom 2</SelectItem>
          <SelectItem value='hexen'>Hexen</SelectItem>
          <SelectItem value='heretic'>Heretic</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
