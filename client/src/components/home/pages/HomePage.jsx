
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Histories } from '../layout/Histories'
import { HomeLayout } from '../layout/HomeLayout'
import { SidebarLeft } from '../layout/SidebarLeft'
import { SidebarRight } from '../layout/SidebarRight'
import SearchResults from '../layout/SearchResults'
import { useHomeStore } from '../../../hooks/useHomeStore'

export const HomePage = () => {
  const { sendPathHook } = useHomeStore()
  const { checkEmptySearchBar } = useSelector(state => state.home)
  const location = useLocation()

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [])
  return (
    <HomeLayout>
      {!checkEmptySearchBar
        ? <SearchResults />
        : <div className='mx-auto flex flex-row justify-around sm:flex-col md:flex-row mt-6 font-inter mb-6'>
          <SidebarLeft />
          <Histories />
          <SidebarRight />
        </div>}
    </HomeLayout>
  )
}
