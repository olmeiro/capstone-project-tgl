import React from 'react'
import { Footer } from './Footer'
import { Histories } from './Histories'
import { NavBar } from './NavBar'
import { SidebarLeft } from './SidebarLeft'
import { SidebarRight } from './SidebarRight'

export const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <SidebarLeft />
      <Histories />
      <SidebarRight />
      <Footer />
    </div>
  )
}
