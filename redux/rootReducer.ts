import { combineReducers } from '@reduxjs/toolkit'
import userSlice from "./slices/user";
import userCloneSlice from "./slices/userClone";

// combineReducersに作成したreducerを追加していく
const rootReducer = combineReducers({
  user: userSlice.reducer,
  userClone: userCloneSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
