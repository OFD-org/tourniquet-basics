import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface LoadingState {
    activeRequests: number;
}

const initialState: LoadingState = {
    activeRequests: 0,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.activeRequests += 1;
        },
        stopLoading: (state) => {
            if (state.activeRequests > 0) {
                state.activeRequests -= 1;
            }
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export const selectIsLoading = (state: RootState) => state.loading.activeRequests > 0;
export default loadingSlice.reducer;
