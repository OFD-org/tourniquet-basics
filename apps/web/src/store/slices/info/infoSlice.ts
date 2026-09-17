import { createSlice } from "@reduxjs/toolkit";

interface LessonState {
  step: number;
}
const initialState: LessonState = {
  step: 0,
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    nextInfoStep: (state) => {
      state.step += 1;
    },
    prevInfoStep: (state) => {
      if (state.step > 0) state.step -= 1;
    },
  },
});

export const { nextInfoStep, prevInfoStep } = infoSlice.actions;
export default infoSlice.reducer;
