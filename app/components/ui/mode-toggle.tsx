import { useTheme } from '../../components/theme-provider'
import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useLocalStorage } from 'react-use'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const [themeValue, setThemeValue] = useLocalStorage('theme', theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {themeValue === 'light' ? (
            <Sun className='me-1' />
          ) : (
            <Moon className='me-1' />
          )}
          <p>Toggle theme</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme('light')
            setThemeValue('light')
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark')
            setThemeValue('dark')
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system')
            setThemeValue('system')
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
function onEffect(arg0: () => void, theme: string) {
  throw new Error('Function not implemented.')
}
