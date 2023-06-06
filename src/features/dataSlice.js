import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    agama: [],
    pekerjaan_orangtua: [],
    pendidikan_terakhir: [],
    sumber_informasi: [],
    kompetensi_keahlian: [],
    statusData: false,
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setAgama: (state, action) => {
            state.agama = action.payload;
        },
        setPekerjaanOrangtua: (state, action) => {
            state.pekerjaan_orangtua = action.payload;
        },
        setPendidikanTerakhir: (state, action) => {
            state.pendidikan_terakhir = action.payload;
        },
        setSumberInformasi: (state, action) => {
            state.sumber_informasi = action.payload;
        },
        setKompetensiKeahlian: (state, action) => {
            state.kompetensi_keahlian = action.payload;
        },
        setStatusData: (state, action) => {
            state.statusData = action.payload;
        },
    }
});

export const {
    setAgama,
    setPekerjaanOrangtua,
    setPendidikanTerakhir,
    setSumberInformasi,
    setKompetensiKeahlian,
    setStatusData
} = dataSlice.actions;
export default dataSlice.reducer;