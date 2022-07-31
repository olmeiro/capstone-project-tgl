import React from 'react'

import { HomeLayout } from '../layout/HomeLayout'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { CarouselProfile } from '../layout/profile/CarouselProfile'
// import { FormProfile } from '../layout/profile/FormProfile'
import { Header } from '../layout/profile/Header'
import { OptionCount } from '../layout/profile/OptionCount'

export const ProfilePage = () => {
  return (
    <HomeLayout >
        <div>
           <Header />
           <CarouselProfile />
           <CardPhotos />
           <OptionCount />
        </div>

    </HomeLayout>
  )
}
