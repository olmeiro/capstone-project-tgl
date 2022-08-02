import React from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { FormOtherUser } from '../layout/profile/FormOtherUser'
import { CardPhotosFriends } from '../layout/profile/CardPhotosFriends'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useHomeStore } from '../../../hooks/useHomeStore'

export const Friends = () => {
  const { sendPathHook } = useHomeStore()
  const location = useLocation();

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [])

  return (
    <HomeLayout>
      <Header>
        <FormOtherUser />
      </Header>
      <CardPhotosFriends />
    </HomeLayout>
  )
}
