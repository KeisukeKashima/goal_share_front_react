import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import OtherState from "../../types/OtherState";

const initialState: OtherState = {
  displayTargetUserId: 0,
  displayTargetGoalId: 0
}

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setDisplayTargetUserId (state: OtherState, action: PayloadAction<number>) {
      state.displayTargetUserId = action.payload
    },
    setDisplayTargetGoalId (state: OtherState, action: PayloadAction<number>) {
      state.displayTargetGoalId = action.payload
    }
  }
})

export const {setDisplayTargetUserId, setDisplayTargetGoalId} = otherSlice.actions

export default otherSlice
