import { Typography } from "@mui/material";

const columns = [
    { field: "index", headerName: "No." },
    {
        field: "kode",
        headerName: "Kode Pendaftaran",
        flex: 1
    },
    {
        field: "nama",
        headerName: "Nama Lengkap",
        flex: 1
    },
    {
        field: 'alamat',
        headerName: 'Alamat',
        flex: 1,
        renderCell: (params) => {
            return (
                <Typography fontSize={'12px'} noWrap>{`${params.row.provinsi},${params.row.kabupaten},${params.row.kecamatan},${params.row.kelurahan}`}</Typography>
            )
        },
        filterable: false
    },
    {
        field: "jenis_kelamin",
        headerName: "Gender",
        flex: 1,
        type: 'singleSelect',
        valueOptions: ['Laki-Laki', 'Perempuan']
    },
    {
        field: "kompetensi_keahlian",
        headerName: "Jurusan",
        flex: 1,
    },
    {
        field: "aksi",
        headerName: "Aksi",
        flex: 1,
        headerAlign: "center",
        align: "center",
        filterable: false
    },
];

export default columns;