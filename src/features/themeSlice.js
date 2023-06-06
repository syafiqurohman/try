import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading: false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

export const { updateLoading } = themeSlice.actions;
export default themeSlice.reducer;