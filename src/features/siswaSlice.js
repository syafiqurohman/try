import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    siswa: [],
    pageSiswa: 0,
    pageSizeSiswa: 10,
    statusSiswa: false,
}

const siswaSlice = createSlice({
    name: 'siswa',
    initialState,
    reducers: {
        setSiswa: (state, action) => {
            state.siswa = action.payload;
        },
        setPageSiswa: (state, action) => {
            state.pageSiswa = action.payload;
        },
        setPageSizeSiswa: (state, action) => {
            state.pageSizeSiswa = action.payload;
            state.pageSiswa = 0
        },
        setStatusSiswa: (state, action) => {
            state.statusSiswa = action.payload;
        },
    }
});

export const {
    setSiswa,
    setPageSiswa,
    setPageSizeSiswa,
    setStatusSiswa
} = siswaSlice.actions;
export default siswaSlice.reducer;