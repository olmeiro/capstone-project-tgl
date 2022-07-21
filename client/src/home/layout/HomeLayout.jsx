import React from 'react'
import { Footer } from './Footer'
import { Histories } from './Histories'
import { NavBar } from './NavBar'
import { SidebarLeft } from './SidebarLeft'
import { SidebarRight } from './SidebarRight'

export const HomeLayout = () => {
  return (
    <div className='container sm:flex-col'>
      <NavBar />
      <div className='mx-auto flex flex-row gap-2 justify-center sm:flex-col md:flex-row mt-8 font-inter'>
        <SidebarLeft />
        <Histories />
        <SidebarRight />
      </div>
      <Footer />
    </div>
  )
}
