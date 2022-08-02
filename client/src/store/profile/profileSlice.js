import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: {
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
    }
  },
  reducers: {
    onLoadDataProfile: (state, { payload }) => {
      state.profileData.alias = payload.aliasUser
      state.profileData.name = payload.name
      state.profileData.bio = payload.bio
      state.profileData.email = payload.email
      state.profileData.phone = payload.phone
      state.profileData.photoProfile = payload.photoProfile
      state.profileData.favorites = payload.favorites
      state.profileData.friends = payload.friends
    },
    onLoadFriendsUser: (state, { payload }) => {
      state.friends = ['friend1', 'friend2']
    },
    onLoadPhotoProfile: (state, { payload }) => {
      state.profileData.photoProfile = payload
    },
    onLoadPublication: (state, { payload }) => {
      state.profileData.publications.push(payload)
    },
    onChangeDataProfile: (state, { payload }) => {
      state.profileData.alias = payload.alias
      state.profileData.name = payload.name
      state.profileData.bio = payload.bio
      state.profileData.email = payload.email
      state.profileData.phone = payload.phone
      state.profileData.password = payload.password
    },
    onLoadCommentPhoto: (state, { payload }) => {
      state.profileData = payload
    },
    deletePhotoUser: (state, { payload }) => {
      state.profileData = payload
    },
    inactivatingCount: (state, { payload }) => {
      state.profileData = payload
    },
    deletingCount: (state, { payload }) => {
      state.profileData = payload
    }
  }
})

export const { onLoadDataProfile, onLoadFriendsUser, onLoadPhotoProfile, onLoadPublication, onChangeDataProfile, onLoadCommentPhoto, inactivatingCount, deletingCount, profileData, photos, friends } = profileSlice.actions
