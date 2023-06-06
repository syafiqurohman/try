import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    pendaftarTotal: [],
    terdaftarTotal: [],
    statusPendaftarTotal: false,
    statusTerdaftarTotal: false
}

const totalSlice = createSlice({
    name: 'total',
    initialState,
    reducers: {
        setTotalPendaftar: (state, action) => {
            state.pendaftarTotal = action.payload;
        },
        setTotalTerdaftar: (state, action) => {
            state.terdaftarTotal = action.payload;
        },
        setStatusPendaftarTotal: (state, action) => {
            state.statusPendaftarTotal = action.payload;
        },
        setStatusTerdaftarTotal: (state, action) => {
            state.statusTerdaftarTotal = action.payload;
        },
    }
});

export const {
    setTotalPendaftar,
    setTotalTerdaftar,
    setStatusPendaftarTotal,
    setStatusTerdaftarTotal
} = totalSlice.actions;
export default totalSlice.reducer;