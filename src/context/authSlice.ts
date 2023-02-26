// Importing helper modules
import { createSlice, type Slice, type PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
  token: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: ''
}

const AuthSlice: Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state: AuthState, action: PayloadAction<string>) => {
      localStorage.setItem('authToken', JSON.stringify(action.payload))
      state.isAuthenticated = true
      state.token = action.payload
    }
  }
})

export const { authSuccess } = AuthSlice.actions

export default AuthSlice.reducer
