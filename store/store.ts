import {combineReducers, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import UserState from "../types/UserState";
import GoalState from "../types/GoalState";
import userSlice from "./slices/userSlice";
import goalSlice from "./slices/goalSlice";

// StateのトップオブジェクトであるRootStateの定義. state足すごとに追加していく
export interface RootState {
  user: UserState
  goal: GoalState
}

// 各state用のreducerをまとめたrootReducer. state足すごとに追加していく.別ファイルに切り出しているサイトもあったが少ないので1ファイルに管理
const rootReducer = combineReducers({
  user: userSlice.reducer,
  goal: goalSlice.reducer
})

// store作成
export const store = ():EnhancedStore<RootState> => configureStore({
  reducer: rootReducer
})
export default store


// 以下、useSelectorの引数に渡すための該当の型のStateを返却するコールバック関数群. 別ファイルに切り出してもいいが少ないので1ファイルに管理
export const selectUserState = (state: RootState): UserState => state.user
export const selectGoalState = (state: RootState): GoalState => state.goal
