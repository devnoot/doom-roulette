import { cn } from "../lib/utils"
import { ReactNode } from "react"

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
  