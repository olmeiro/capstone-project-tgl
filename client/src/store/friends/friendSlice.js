import { createSlice } from '@reduxjs/toolkit'

export const friendSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: []
  },
  reducers: {
    getFriendsFromUser: (state, { payload }) => {
      state.friends = payload
    },
    deleteFriend: (state, { payload }) => {
      state.friends = state.friends.filter(friend => friend.id !== payload)
    }
  }
})

export const { getFriendsFromUser, deleteFriend } = friendSlice.actions
