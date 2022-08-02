import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    posts: [],
    suggestions: [],
    checkComments: false
  },
  reducers: {
    getPostsToHome: (state, { payload }) => {
      state.posts = payload
    },
    getFriendsFromFriends: (state, { payload }) => {
      state.suggestions = payload
    },
    checkComments: (state, { payload }) => {
      state.checkComments = !state.checkComments
    }
  }
})

export const { getPostsToHome, getFriendsFromFriends, checkComments } = homeSlice.actions
