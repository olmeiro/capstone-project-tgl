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
        infoFromUserLoggedIn: null,
        checkInfoUser: false,
        postsFromUserLoggedIn: [],
        favorites: [],
        checkFavorites: false
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
        },
        setInfoFromUserLoggedIn: (state, { payload }) => {
            state.infoFromUserLoggedIn = payload
        },
        setcheckInfoUser: (state, { payload }) => {
            state.checkInfoUser = !state.checkInfoUser
        },
        setPostsFromUserLoggedIn: (state, { payload }) => {
            state.postsFromUserLoggedIn = payload
        },
        actionKeepLastUserVisitesOnRedux: (state, { payload }) => {
            state.lastUserVisited = payload
        },
        getFavorites: (state, { payload }) => {
            state.favorites = payload
        },
        checkFavorites: (state, { payload }) => {
            state.checkFavorites = !state.checkFavorites
        }
    }
})

export const { checkFavorites, getFavorites, actionKeepLastUserVisitesOnRedux, setPostsFromUserLoggedIn, setcheckInfoUser, setInfoFromUserLoggedIn, getPostsToHome, getFriendsFromFriends, checkComments, getUserSearched, checkEmptySearchBar, setPathReference, setLastUserVisited, getPostsOfLastUserVisited } = homeSlice.actions
