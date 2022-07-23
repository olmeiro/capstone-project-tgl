import React from 'react'

import { HomeLayout } from '../layout/HomeLayout'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { CarouselProfile } from '../layout/profile/CarouselProfile'
import { FormProfile } from '../layout/profile/FormProfile'
import { Header } from '../layout/profile/Header'

export const ProfilePage = () => {
  return (
    <HomeLayout >
        <div>
           <Header>
            <FormProfile />
           </Header>
           <CarouselProfile />
           <CardPhotos />
        </div>

    </HomeLayout>
  )
}
