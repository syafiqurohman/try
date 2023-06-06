import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import * as yup from "yup";
import Divider from '@mui/material/Divider';
import useMediaQuery from "@mui/material/useMediaQuery";

const KelengkapanDataForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      console.log(values);
    };
  
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
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="NIK/No.Kitas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noKitas}
                  name="noKitas"
                  error={!!touched.noKitas && !!errors.noKitas}
                  helperText={touched.noKitas && errors.noKitas}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="No KK"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.kompetensiKeahlian}
                  name="noKK"
                  error={!!touched.noKK && !!errors.noKK}
                  helperText={touched.noKK && errors.noKK}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="No Registrasi Akta Lahir"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noRegAktaLahir}
                  name="noRegAktaLahir"
                  error={!!touched.noRegAktaLahir && !!errors.noRegAktaLahir}
                  helperText={touched.noRegAktaLahir && errors.noRegAktaLahir}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Kewarganegaraan"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.kewarganegaraan}
                  name="kewarganegaraan"
                  error={!!touched.kewarganegaraan && !!errors.kewarganegaraan}
                  helperText={touched.kewarganegaraan && errors.kewarganegaraan}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Sekolah Asal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sekolahAsal}
                  name="sekolahAsal"
                  error={!!touched.namaLengkapPendaftar && !!errors.namaLengkapPendaftar}
                  helperText={touched.namaLengkapPendaftar && errors.namaLengkapPendaftar}
                  sx={{ gridColumn: "span 20" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="No. Seri Ijazah SMP/MTs"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noIjazah}
                  name="noIjazah"
                  error={!!touched.noIjazah && !!errors.noIjazah}
                  helperText={touched.noIjazah && errors.noIjazah}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="No. SKHUN SMP/MTs"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noSKHUN}
                  name="noSKHUN"
                  error={!!touched.noSKHUN && !!errors.noSKHUN}
                  helperText={touched.noSKHUN && errors.noSKHUN}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Rencana Transportasi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rencanaTransportasi}
                  name="rencanaTransportasi"
                  error={!!touched.rencanaTransportasi && !!errors.rencanaTransportasi}
                  helperText={touched.rencanaTransportasi && errors.rencanaTransportasi}
                  sx={{ gridColumn: "span 12" }}
                />
                <FormControlLabel sx={{ gridColumn: "span 8" }} required control={<Checkbox />} label="Berkebutuhan Khusus" />
                
                <Divider sx={{ gridColumn: "span 20" }}>Rincian Pribadi Pendaftar</Divider>

                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Tinggi Badan (cm)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tinggiBadan}
                  name="tinggiBadan"
                  error={!!touched.tinggiBadan && !!errors.tinggiBadan}
                  helperText={touched.tinggiBadan && errors.tinggiBadan}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Berat Badan (kg)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.beratBadan}
                  name="beratBadan"
                  error={!!touched.beratBadan && !!errors.beratBadan}
                  helperText={touched.beratBadan && errors.beratBadan}
                  sx={{ gridColumn: "span 8" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="number"
                  label="Jarak Tempat Tinggal dari Sekolah (km)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.jarakTempuh}
                  name="jarakTempuh"
                  error={!!touched.jarakTempuh && !!errors.jarakTempuh}
                  helperText={touched.jarakTempuh && errors.jarakTempuh}
                  sx={{ gridColumn: "span 12" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Waktu Tempuh Ke Sekolah ( menit )"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.waktuTempuh}
                  name="waktuTempuh"
                  error={!!touched.waktuTempuh && !!errors.waktuTempuh}
                  helperText={touched.waktuTempuh && errors.waktuTempuh}
                  sx={{ gridColumn: "span 8" }}
                />

                <Divider sx={{ gridColumn: "span 20" }}>Data Ayah Kandung</Divider>              
  
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Pendapatan Bulanan Ayah"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pendapatanBulananAyah}
                  name="pendapatanBulananAyah"
                  error={!!touched.pendapatanBulananAyah && !!errors.pendapatanBulananAyah}
                  helperText={touched.pendapatanBulananAyah && errors.pendapatanBulananAyah}
                  sx={{ gridColumn: "span 14" }}
                />
                <FormControlLabel sx={{ gridColumn: "span 6" }} required control={<Checkbox />} label="Berkebutuhan Khusus" />

                <Divider sx={{ gridColumn: "span 20" }}>Data Ibu Kandung</Divider>              
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  type="text"
                  label="Pendapatan Bulanan Ibu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pendapatanBulananIbu}
                  name="pendapatanBulananIbu"
                  error={!!touched.pendapatanBulananIbu && !!errors.pendapatanBulananIbu}
                  helperText={touched.pendapatanBulananIbu && errors.pendapatanBulananIbu}
                  sx={{ gridColumn: "span 14" }}
                />
                <FormControlLabel sx={{ gridColumn: "span 6" }} required control={<Checkbox />} label="Berkebutuhan Khusus" />
                
                
  
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

export default KelengkapanDataForm