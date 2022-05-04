import {combineReducers, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import UserState from "../types/UserState";
import GoalState from "../types/GoalState";
import userSlice from "./slices/userSlice";
import goalSlice from "./slices/goalSlice";
import { save, load } from 'redux-localstorage-simple';
import OtherState from "../types/OtherState";
import otherSlice from "./slices/otherSlice";

// StateのトップオブジェクトであるRootStateの定義. state足すごとに追加していく
export interface RootState {
  user: UserState
  goal: GoalState
  other: OtherState
}

// 各state用のreducerをまとめたrootReducer. state足すごとに追加していく.別ファイルに切り出しているサイトもあったが少ないので1ファイルに管理
const rootReducer = combineReducers({
  user: userSlice.reducer,
  goal: goalSlice.reducer,
  other: otherSlice.reducer
})

// store作成
export const store = ():EnhancedStore<RootState> => configureStore({
  reducer: rootReducer,
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save())
})
export default store


// 以下、useSelectorの引数に渡すための該当の型のStateを返却するコールバック関数群. 別ファイルに切り出してもいいが少ないので1ファイルに管理
export const selectUserState = (state: RootState): UserState => state.user
export const selectGoalState = (state: RootState): GoalState => state.goal
export const selectOtherState = (state: RootState): OtherState => state.other
