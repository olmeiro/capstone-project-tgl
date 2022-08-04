import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CarouselProfile } from '../layout/profile/CarouselProfile'
// import { FormProfile } from '../layout/profile/FormProfile'
import { useHomeStore } from '../../../hooks/useHomeStore'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { OptionCount } from '../layout/profile/OptionCount'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'

export const ProfilePage = () => {
  const { sendPathHook } = useHomeStore()
  const location = useLocation()

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [])

  return (
    <HomeLayout >
        <div>
           <Header />
           {/* <CarouselProfile /> */}
           <CardPhotos />
           <OptionCount />
        </div>

    </HomeLayout>
  )
}
