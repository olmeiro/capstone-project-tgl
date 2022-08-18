import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { FormOtherUser } from '../layout/profile/FormOtherUser'
import { CardPhotosFriends } from '../layout/profile/CardPhotosFriends'
import { useHomeStore } from '../../../hooks/useHomeStore'
import { useFriendStore } from '../../../hooks/useFriendStore'

export const Friends = () => {
  const { sendPathHook } = useHomeStore()
  const location = useLocation()
  const { getFriendsFromUserHook } = useFriendStore()

  useEffect(() => {
    getFriendsFromUserHook()
  }, [])

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [location])

  return (
    <HomeLayout>
      <div className="min-h-screen">
        <Header>
          <FormOtherUser />
        </Header>
        <CardPhotosFriends />
      </div>
    </HomeLayout>
  )
}
