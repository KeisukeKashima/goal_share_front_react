import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

// rootReducer(作成した自作reducerを含むrootのreducer)を登録してstoreとして利用できるようにする
const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export default store
