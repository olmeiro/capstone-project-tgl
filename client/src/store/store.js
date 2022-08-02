import { configureStore } from '@reduxjs/toolkit'
import { authSlice, homeSlice } from './'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
