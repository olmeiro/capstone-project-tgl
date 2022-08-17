import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { CarouselProfile } from '../layout/profile/CarouselProfile'
import { useHomeStore } from '../../../hooks/useHomeStore'

export const ProfilePage = () => {
  const { sendPathHook } = useHomeStore()
  const location = useLocation()
  const { getInfoFromTheUserLoggedIn, getPostsFromUserLoggedIn } =
    useHomeStore()
  const { checkInfoUser } = useSelector((state) => state.home)

  useEffect(() => {
    sendPathHook(location.pathname)
    getInfoFromTheUserLoggedIn()
    getPostsFromUserLoggedIn()
  }, [checkInfoUser])

  return (
    <HomeLayout>
      <div className="min-h-screen">
        <Header />
        <CarouselProfile />
        <CardPhotos />
      </div>
    </HomeLayout>
  )
}
