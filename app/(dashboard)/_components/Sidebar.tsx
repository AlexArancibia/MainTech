import React from 'react'
import { Logo } from './logo'
import SiderbarRoutes from './SiderbarRoutes'

function Siderbar() {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full'>
        <SiderbarRoutes></SiderbarRoutes>

      </div>
    </div>
  )
}

export default Siderbar