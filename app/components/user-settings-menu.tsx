import { Settings } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'react-use'

import { cn } from '../lib/utils'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'
import { Input } from './ui/input'
import { Label } from './ui/label'

const DOOM_ENGINE_REGEXP =
  /^[a-zA-Z]:((\\|\/)[a-zA-Z0-9\s_@\-^!#$%&+={}[\]]+)+\.exe$/i

export const UserSettingsDrawer = ({ ...rest }) => {
  const [odamexFieldValue, setOdamexFieldValue] = useState(
    window.api.odamex ?? ''
  )
  const [gzdoomFieldValue, setGzdoomFieldValue] = useState(
    window.api.gzdoom ?? ''
  )
  const [pwadsFieldValue, setPwadsFieldValue] = useState(window.api.pwads ?? '')
  const [iwadsFieldValue, setIwadsFieldValue] = useState(window.api.iwads ?? '')

  useDebounce(
    () => {
      window.api.setOdamex(odamexFieldValue)
      window.api.setGzdoom(gzdoomFieldValue)
      window.api.setPwads(pwadsFieldValue)
      window.api.setIwads(iwadsFieldValue)
    },
    666,
    [odamexFieldValue, gzdoomFieldValue, pwadsFieldValue, iwadsFieldValue]
  )

  const onOdamexFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setOdamexFieldValue(e.target.value)
  const onGzdoomFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setGzdoomFieldValue(e.target.value)
  const onPwadsFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPwadsFieldValue(e.target.value)
  const onIwadsFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setIwadsFieldValue(e.target.value)

  return (
    <Drawer {...rest}>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <Settings className='mr-1' /> User Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>User Settings</DrawerTitle>
        </DrawerHeader>

        <div className={cn('p-5', 'space-y-4')}>
          <div>
            <Label htmlFor='odamex-path'>Path to odamex</Label>
            <Input
              id='odamex-path'
              name='odamex-path'
              onChange={onOdamexFieldValueChanged}
              value={odamexFieldValue}
            />
          </div>

          <div>
            <Label htmlFor='gzdoom-path'>Path to gzdoom</Label>
            <Input
              id='gzdoom-path'
              name='gzdoom-path'
              onChange={onGzdoomFieldValueChanged}
              value={gzdoomFieldValue}
            />
          </div>

          <div>
            <Label htmlFor='iwads-path'>Path to iwad directory</Label>
            <Input
              id='iwads-path'
              name='iwads-path'
              onChange={onIwadsFieldValueChanged}
              value={iwadsFieldValue}
            />
          </div>

          <div>
            <Label htmlFor='pwads-path'>Path to pwad directory</Label>
            <Input
              id='pwads-path'
              name='pwads-path'
              onChange={onPwadsFieldValueChanged}
              value={pwadsFieldValue}
            />
          </div>

          {/* <h3 className='text-base'>
            <strong>Theme Settings</strong>
          </h3>

          <ModeToggle /> */}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
