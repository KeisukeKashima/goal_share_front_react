import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserState from "../../types/UserState";

const initialState: UserState = {
  isSignedIn: false,
  id: 0,
  displayName: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsSignedIn (state: UserState, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload
    },
    setId (state: UserState, action: PayloadAction<number>) {
      state.id = action.payload
    },
    setDisplayName (state: UserState, action: PayloadAction<string>) {
      state.displayName = action.payload
    }
  }
})

export const {
  setIsSignedIn, setId, setDisplayName
} = userSlice.actions

export default userSlice
