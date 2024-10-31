import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import alertSlice from '../state/alertSlice.js'

import { api } from './api'

const initialState = {
  mode: 'dark',
}

export const globalSlices = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'light' : 'dark'
    },
  },
})

export const { setThemeMode } = globalSlices.actions

const store = configureStore({
  reducer: {
    globalStyle: globalSlices.reducer,
    alert: alertSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
setupListeners(store.dispatch)

export default store
