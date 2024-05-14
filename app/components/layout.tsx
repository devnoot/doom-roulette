import { ReactNode } from 'react'

import { cn } from '../lib/utils'

export type LayoutProps = {
  children: ReactNode | ReactNode[]
}

export const Layout = ({ children }: LayoutProps) => (
  <div
    className={cn(
      'flex',
      'flex-col',
      'container',
      'max-w-[480px]',
      'justify-center'
    )}
  >
    {children}
  </div>
)
