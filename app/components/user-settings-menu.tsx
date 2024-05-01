import { cn } from '../lib/utils'
import { Settings } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ModeToggle } from './ui/mode-toggle'

const DOOM_ENGINE_REGEXP =
  /^[a-zA-Z]:((\\|\/)[a-zA-Z0-9\s_@\-^!#$%&+={}[\]]+)+\.exe$/i

export const UserSettingsDrawer = ({ ...rest }) => {
  const [odamexPath, setOdamexPath] = useLocalStorage('odamex-path', '')
  const [gzdoomPath, setGzdoomPath] = useLocalStorage('gzdoom-path', '')

  const [wadsPath, setWadsPath] = useLocalStorage('wads-path', '')

  const [odamexFieldValue, setOdamexFieldValue] = useState(
    odamexPath ? decodeURIComponent(odamexPath) : ''
  )
  const [gzdoomFieldValue, setGzdoomFieldValue] = useState(
    gzdoomPath ? decodeURIComponent(gzdoomPath) : ''
  )
  const [wadsPathFieldValue, setWadsPathFieldValue] = useState(
    wadsPath ? decodeURIComponent(wadsPath) : ''
  )

  const [, setOdamexPathIsValid] = useState(false)
  const [, setGzdoomPathIsValid] = useState(false)

  const [, setOdamexFieldTouched] = useState(false)
  const [, setGzdoomFieldTouched] = useState(false)
  const [, setWadsPathFieldTouched] = useState(false)

  const onOdamexFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setOdamexFieldTouched(true)
    setOdamexFieldValue(e.target.value)
  }

  const onGzdoomFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setGzdoomFieldTouched(true)
    setGzdoomFieldValue(e.target.value)
  }

  const onWadsPathFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setWadsPathFieldTouched(true)
    setWadsPathFieldValue(e.target.value)
  }

  // Update the path validity in the case that the field is not empty
  useEffect(() => {
    setOdamexPathIsValid(DOOM_ENGINE_REGEXP.test(odamexFieldValue))
    setGzdoomPathIsValid(DOOM_ENGINE_REGEXP.test(gzdoomFieldValue))
    setOdamexPath(encodeURIComponent(odamexFieldValue))
    setGzdoomPath(encodeURIComponent(gzdoomFieldValue))
  }, [odamexFieldValue, gzdoomFieldValue])

  useEffect(() => {
    setWadsPath(encodeURIComponent(wadsPathFieldValue))
  }, [wadsPathFieldValue])

  return (
    <Drawer {...rest}>
      <DrawerTrigger asChild>
        <Button variant='secondary'>
          <Settings className='mr-1' /> User Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>User Settings</DrawerTitle>
          <DrawerDescription>
            These are stored in your browser's localStorage.
          </DrawerDescription>
        </DrawerHeader>

        <div className={cn('p-5', 'space-y-4')}>
          <h3 className='text-base'>
            <strong>Doom Engine Settings</strong>
          </h3>

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
            <Label htmlFor='wads-path'>Path to wad directory</Label>
            <Input
              id='wads-path'
              name='wads-path'
              onChange={onWadsPathFieldValueChanged}
              value={wadsPathFieldValue}
            />
          </div>

          <h3 className='text-base'>
            <strong>Theme Settings</strong>
          </h3>

          <ModeToggle />
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
