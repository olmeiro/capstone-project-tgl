import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: {},
    photos: [],
    friends: []
  },
  reducers: {
    onLoadDataProfile: (state, { payload }) => {
      state.profileData = payload
    },
    onLoadFriendsUser: (state, { payload }) => {
      // state.friends = payload
      state.friends = ['friend1', 'friend2']
    },
    onLoadPhotosUser: (state, { payload }) => {
      // state.photos = payload
      state.photos = ['photo1', 'photo2']
    },
    onChangeDataProfile: (state, { payload }) => {
      state.profile = payload
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

export const { onLoadDataProfile, onLoadFriendsUser, onLoadPhotosUser, onChangeDataProfile, onLoadCommentPhoto, inactivatingCount, deletingCount } = profileSlice.actions
