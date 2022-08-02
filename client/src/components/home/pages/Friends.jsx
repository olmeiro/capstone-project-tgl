import React from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { FormOtherUser } from '../layout/profile/FormOtherUser'
import { CardPhotosFriends } from '../layout/profile/CardPhotosFriends'

export const Friends = () => {
  return (
    <HomeLayout>
      <Header>
        <FormOtherUser />
      </Header>
      <CardPhotosFriends />
    </HomeLayout>
  )
}
