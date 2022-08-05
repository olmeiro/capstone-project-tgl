
import React from 'react'
import { Histories } from '../layout/Histories'
import { HomeLayout } from '../layout/HomeLayout'
import { SidebarLeft } from '../layout/SidebarLeft'
import { SidebarRight } from '../layout/SidebarRight'
import SearchResults from '../layout/SearchResults'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import { useHomeStore } from '../../../hooks/useHomeStore'

export const HomePage = () => {

  const { sendPathHook } = useHomeStore()
  const { checkEmptySearchBar } = useSelector(state => state.home)
  const location = useLocation();

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [])
  return (
    <HomeLayout>
      {!checkEmptySearchBar ? <SearchResults /> :
        <div className='mx-auto flex flex-row gap-2 justify-center sm:flex-col md:flex-row mt-6 font-inter mb-6'>
          <SidebarLeft />
          <Histories />
          <SidebarRight />
        </div>}
    </HomeLayout>
  )
}
