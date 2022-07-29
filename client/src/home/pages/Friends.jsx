import React from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { CardPhotos } from '../layout/profile/CardPhotos'
import { FormOtherUser } from '../layout/profile/FormOtherUser'

export const Friends = () => {
  return (
    <HomeLayout>
      <Header>
        <FormOtherUser />
      </Header>
      <CardPhotos />
    </HomeLayout>
  )
}
