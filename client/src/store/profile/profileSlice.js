import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    id: '',
    alias: '',
    name: '',
    bio: '',
    status: true,
    email: '',
    phone: '',
    password: '',
    photoProfile: '',
    photoCover: '',
    friends: [],
    photos: [],
    favorites: [],
    publications: []

  },
  reducers: {
    onLoadDataProfile: (state, { payload }) => {
      state.alias = payload.aliasUser
      state.name = payload.name
      state.bio = payload.bio
      state.email = payload.email
      state.phone = payload.phone
      state.photoProfile = payload.photoProfile
      state.favorites = payload.favorites
      state.friends = payload.friends
    },
    onLoadFriendsUser: (state, { payload }) => {
      state.friends = ['friend1', 'friend2']
    },
    onLoadPhotoProfile: (state, { payload }) => {
      state.photoProfile = payload
    },
    onSendPublication: (state, { payload }) => {
      state.publications[0].push(payload)
    },
    onLoadPublication: (state, { payload }) => {
      state.publications = payload
    },
    onChangeDataProfile: (state, { payload }) => {
      state.alias = payload.alias
      state.name = payload.name
      state.bio = payload.bio
      state.email = payload.email
      state.phone = payload.phone
      state.password = payload.password
    },
    onLoadCommentPhoto: (state, { payload }) => {
      state = payload
    },
    deletePhotoUser: (state, { payload }) => {
      state = payload
    },
    inactivatingCount: (state, { payload }) => {
      state = payload
    },
    deletingCount: (state, { payload }) => {
      state = payload
    }
  }
})

export const { onLoadDataProfile, onLoadFriendsUser, onLoadPhotoProfile, onSendPublication, onLoadPublication, onChangeDataProfile, onLoadCommentPhoto, inactivatingCount, deletingCount, profile, photos, friends } = profileSlice.actions
