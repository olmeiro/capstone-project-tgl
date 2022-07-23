
import React from 'react'
import { Histories } from '../layout/Histories'
import { HomeLayout } from '../layout/HomeLayout'
import { SidebarLeft } from '../layout/SidebarLeft'
import { SidebarRight } from '../layout/SidebarRight'

export const HomePage = () => {
  return (
    <HomeLayout >
      <div className='mx-auto flex flex-row gap-2 justify-center sm:flex-col md:flex-row mt-8 font-inter'>
        <SidebarLeft />
        <Histories />
        <SidebarRight />
      </div>
    </HomeLayout>
  )
}
