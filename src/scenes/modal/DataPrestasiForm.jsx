import React from 'react';
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Divider from '@mui/material/Divider';
import useMediaQuery from "@mui/material/useMediaQuery";
import FileUploader from '../../components/common/FileUpload/FileUploader/FileUploader';
import FileList from '../../components/common/FileUpload/FileList/FileList';

const DataPrestasiForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      console.log(values);
    };
    const [files, setFiles] = useState([])

    const removeFile = (filename) => {
      setFiles(files.filter(file => file.name !== filename))
    }
  
    return (
      <Box m="20px">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 20" },
                }}
              >
                <Divider sx={{ mt: "-20px", gridColumn: "span 20" }}>Rincian Prestasi No.1</Divider>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Nama Prestasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.namaPrestasi}
                  name="namaPrestasi"
                  error={!!touched.namaPrestasi && !!errors.namaPrestasi}
                  helperText={touched.namaPrestasi && errors.namaPrestasi}
                  sx={{ gridColumn: "span 7" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Jenis Prestasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.jenisPrestasi}
                  name="jenisPrestasi"
                  error={!!touched.jenisPrestasi && !!errors.jenisPrestasi}
                  helperText={touched.jenisPrestasi && errors.jenisPrestasi}
                  sx={{ gridColumn: "span 13" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Tingkat Prestasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tingkatPrestasi}
                  name="tingkatPrestasi"
                  error={!!touched.tingkatPrestasi && !!errors.tingkatPrestasi}
                  helperText={touched.tingkatPrestasi && errors.tingkatPrestasi}
                  sx={{ gridColumn: "span 7" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Peringkat Prestasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.peringkatPrestasi}
                  name="peringkatPrestasi"
                  error={!!touched.peringkatPrestasi && !!errors.peringkatPrestasi}
                  helperText={touched.peringkatPrestasi && errors.peringkatPrestasi}
                  sx={{ gridColumn: "span 13" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Tahun Prestasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tahunPrestasi}
                  name="tahunPrestasi"
                  error={!!touched.tahunPrestasi && !!errors.tahunPrestasi}
                  helperText={touched.tahunPrestasi && errors.tahunPrestasi}
                  sx={{ gridColumn: "span 7" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Penyelenggara"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.penyelenggara}
                  name="penyelenggara"
                  error={!!touched.penyelenggara && !!errors.penyelenggara}
                  helperText={touched.penyelenggara && errors.penyelenggara}
                  sx={{ gridColumn: "span 13" }}
                />                
              </Box>
              <Box m="10px">
                <Typography 
                mb="10px" 
                variant="h5" 
                fontWeight="bold" 
                align="center"
                > Upload File Sertifikat</Typography>
                  <FileUploader files={files} setFiles={setFiles}
                    removeFile={removeFile} />
                  <FileList files={files} removeFile={removeFile} />
              </Box>
              
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    noKitas: yup.string().required("required"),
    noKK: yup.string().required("required"),
    noRegAktaLahir: yup.string().required("required"),
    kewarganegaraan: yup.string().required("required"),
    sekolahAsal: yup.string().required("required"),
    noIjazah: yup.string().required("required"),
    noSKHUN: yup.string().required("required"),
    tinggiBadan: yup.string().required("required"),
    beratBadan: yup.date().required("required"),
    jarakTempuh: yup.date().required("required"),
    waktuTempuh: yup.date().required("required"),
    pendapatanBulananAyah: yup.date().required("required"),
    pendapatanBulananIbu: yup.date().required("required"),
  });
  const initialValues = {
    kode: "",
    kompetensiKeahlian: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };

export default DataPrestasiForm