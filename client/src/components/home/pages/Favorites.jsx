import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { HomeLayout } from '../layout/HomeLayout'
import { Header } from '../layout/profile/Header'
import { FormOtherUser } from '../layout/profile/FormOtherUser'
import { CardFavorites } from '../layout/card/CardFavorites'
import { useHomeStore } from '../../../hooks/useHomeStore'
import { useFriendStore } from '../../../hooks/useFriendStore'

export const Favorites = () => {
  const { sendPathHook, getFavoritesHook } = useHomeStore()
  const location = useLocation()
  const { getFriendsFromUserHook } = useFriendStore()

  useEffect(() => {
    getFriendsFromUserHook()
    getFavoritesHook()
  }, [])

  useEffect(() => {
    sendPathHook(location.pathname)
  }, [])

  return (
    <HomeLayout>
      <div className="min-h-screen">
        <Header>
          <FormOtherUser />
        </Header>
        <CardFavorites />
      </div>
    </HomeLayout>
  )
}
