import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        suggestions: [],
        checkComments: false,
        userSearch: [],
        checkEmptySearchBar: true,
        pathReference: "/",
        lastUserVisited: null,
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
        },
        getUserSearched: (state, { payload }) => {
            state.userSearch = payload
        },
        checkEmptySearchBar: (state, { payload }) => {
            if (state.userSearch == null) {
                state.checkEmptySearchBar = true
            }
            else {
                state.checkEmptySearchBar = false
            }
        },
        setPathReference: (state, { payload }) => {
            state.pathReference = payload;
        },
        setLastUserVisited: (state, { payload }) => {
            state.lastUserVisited = payload
        }
    }
})

export const { getPostsToHome, getFriendsFromFriends, checkComments, getUserSearched, checkEmptySearchBar, setPathReference, setLastUserVisited, getPostsOfLastUserVisited } = homeSlice.actions
