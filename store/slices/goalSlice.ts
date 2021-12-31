import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import GoalState from "../../types/GoalState";

const initialState: GoalState = {
  name: '貯金'
}

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setName(state: GoalState, action: PayloadAction<string>) {
      state.name = action.payload
    }
  }
})

export const {setName} = goalSlice.actions

export default goalSlice
