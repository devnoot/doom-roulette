import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='min-h-screen w-screen flex flex-col justify-center'>
      <Outlet />
    </div>
  )
}
