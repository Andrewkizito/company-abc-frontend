// Importing helper modules
import { configureStore, type Store } from '@reduxjs/toolkit'

// Importing reducers
import shopReducer from './shopSlice'
import authReducer from './authSlice'

const AppStore: Store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer
  }
})

export default AppStore
