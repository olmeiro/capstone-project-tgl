import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        suggestions: [],
    },
    reducers: {
        getPostsToHome: (state, { payload }) => {
            state.posts = payload
        },
        getFriendsFromFriends: (state, { payload }) => {
            state.suggestions = payload
        }
    }
})

export const { getPostsToHome, getFriendsFromFriends } = homeSlice.actions
