import { configureStore } from '@reduxjs/toolkit'

import { authSlice, profileSlice, homeSlice, friendSlice } from './index'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    home: homeSlice.reducer,
    friends: friendSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
