import React, { useEffect } from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { FormOtherUser } from '../layout/profile/FormOtherUser'
import { CardPhotosFriends } from '../layout/profile/CardPhotosFriends'

import { useLocation } from 'react-router-dom'
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
  }, [])
  // flex justify-center h-[80vh]
  return (
    <HomeLayout >
      <div>
        <Header>
          <FormOtherUser />
        </Header>
        <CardPhotosFriends />
      </div>
    </HomeLayout>
  )
}
