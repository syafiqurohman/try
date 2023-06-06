import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    pendaftar: [],
    pagePendaftar: 0,
    pageSizePendaftar: 10,
    statusPendaftar: false,
}

const pendaftarSlice = createSlice({
    name: 'pendaftar',
    initialState,
    reducers: {
        setPendaftar: (state, action) => {
            state.pendaftar = action.payload;
        },
        setPagePendaftar: (state, action) => {
            state.pagePendaftar = action.payload;
        },
        setPageSizePendaftar: (state, action) => {
            state.pageSizePendaftar = action.payload;
            state.pagePendaftar = 0
        },
        setStatusPendaftar: (state, action) => {
            state.statusPendaftar = action.payload;
        },
    }
});

export const {
    setPendaftar,
    setPagePendaftar,
    setPageSizePendaftar,
    setStatusPendaftar
} = pendaftarSlice.actions;
export default pendaftarSlice.reducer;