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
      headerName: "Kelengkapan Data",
      flex: 1,
      filterable: false
    },
  ];

  export default columns;