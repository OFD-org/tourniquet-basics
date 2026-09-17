import { createSlice } from "@reduxjs/toolkit";

interface FlowState {
  step: number;
}

const initialState: FlowState = {
  step: 0,
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 0) state.step -= 1;
    },
    resetFlow: (state) => {
      state.step = 0;
    },
  },
});

export const { nextStep, prevStep, resetFlow } = flowSlice.actions;
export default flowSlice.reducer;
