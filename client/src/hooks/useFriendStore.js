import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socialApi } from '../api'
import { getFriendsFromUser, deleteFriend } from '../store'

export const useFriendStore = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const userId = user.id

  const getFriendsFromUserHook = async () => {
    const response = await socialApi.get(`/friends/${userId}`)
    const friends = response.data.body
    dispatch(getFriendsFromUser(friends))
  }
  const deleteFriendHook = async friendId => {
    await socialApi.delete(`/friends?userid=${userId}&friendid=${friendId}`)
    dispatch(deleteFriend(friendId))
  }
  return {
    getFriendsFromUserHook,
    deleteFriendHook
  }
}
