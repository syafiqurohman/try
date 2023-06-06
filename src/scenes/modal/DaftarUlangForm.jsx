import React from 'react'
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import useMediaQuery from "@mui/material/useMediaQuery";
import Input from '../../components/common/Control/Input';
import { useSelector } from 'react-redux';
import Select from '../../components/common/Control/Select';
import DateInput from '../../components/common/Control/DateInput';
import AutoComplete from '../../components/common/Control/AutoComplete';
import { get_all } from '../../config/api';
import { useWatch } from 'react-hook-form';

const optionsRegistrasiAs = [
  { id: "Siswa Baru", name: "Siswa Baru" },
  { id: "Siswa Lama", name: "Siswa Lama" },
  { id: "Siswa Pindahan", name: "Siswa Pindahan" },
]

const optionsRencanaTinggal = [
  { id: "Kos", name: "Kos" },
  { id: "Rumah", name: "Rumah" },
  { id: "Pondok/Asrama", name: "Pondok/Asrama" },
]

const DaftarUlangForm = (props) => {
  const { control, watch, setValue } = props;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [provinsi, setProvinsi] = React.useState([]);
  const [kabupaten, setKabupaten] = React.useState([]);
  const [kecamatan, setKecamatan] = React.useState([]);
  const [kelurahan, setKelurahan] = React.useState([]);
  const { kompetensi_keahlian, sumber_informasi, agama, pendidikan_terakhir, pekerjaan_orangtua } = useSelector(state => state.data);

  const provinsiValue = useWatch({
    control,
    name: "provinsi",
  });

  const kabupatenValue = useWatch({
    control,
    name: "kabupaten",
  });

  const kecamatanValue = useWatch({
    control,
    name: "kecamatan",
  });

  React.useEffect(() => {
    get_all({ endpoint: 'provinsi' }).then((e) => {
      setProvinsi(e.data)
    }).catch((e) => console.log(e))
  }, [])

  React.useEffect(() => {
    if (provinsiValue) {
      get_all({ endpoint: 'kabupaten?id=' + provinsiValue.id }).then((e) => {
        setKabupaten(e.data)
      }).catch((e) => console.log(e))
    } else {
      setValue('kabupaten', null);
      setValue('kecamatan', null);
      setValue('kelurahan', null);
    }
  }, [provinsiValue, setValue])

  React.useEffect(() => {
    if (kabupatenValue) {
      get_all({ endpoint: 'kecamatan?id=' + kabupatenValue.id }).then((e) => {
        setKecamatan(e.data)
      }).catch((e) => console.log(e))
    } else {
      setValue('kecamatan', null);
      setValue('kelurahan', null);
    }
  }, [kabupatenValue, setValue])

  React.useEffect(() => {
    if (kecamatanValue) {
      get_all({ endpoint: 'kelurahan?id=' + kecamatanValue.id }).then((e) => {
        setKelurahan(e.data)
      }).catch((e) => console.log(e))
    } else {
      setValue('kelurahan', null);
    }
  }, [kecamatanValue, setValue])
  return (
    <Box m="20px">
      <Box
        display="grid"
        gap="18px"
        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 20" },
        }}
      >
        {/* AUTOCOMPLETE */}
        <Input
          rules={{ required: false }}
          name={"kode"}
          control={control}
          label={"Kode"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'kompetensi_keahlian'}
          control={control}
          label={'Kompetensi Keahlian'}
          options={kompetensi_keahlian.length > 0 ? kompetensi_keahlian.map((e) => ({ id: parseInt(e.no_pk), name: e.program_keahlian })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        <Select
          name={'jenis_registrasi'}
          control={control}
          label={'Jenis Registrasi'}
          options={optionsRegistrasiAs}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'sumber_informasi'}
          control={control}
          label={'Sumber Informasi'}
          options={sumber_informasi.length > 0 ? sumber_informasi.map((e) => ({ id: e.sumber_informasi, name: e.sumber_informasi })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        <Divider sx={{ gridColumn: "span 20" }}>Data Diri Pendaftar</Divider>
        <Input
          rules={{ required: false }}
          name={"nama"}
          control={control}
          label={"Nama Lengkap Pendaftar"}
          defaultValue={""}
          sx={{ gridColumn: "span 20" }}
        />
        <Input
          rules={{ required: false }}
          name={"nisn"}
          control={control}
          label={"NISN"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'jenis_kelamin'}
          control={control}
          label={'Jenis Kelamin'}
          options={[{ id: 'Laki-Laki', name: 'Laki-Laki' }, { id: 'Perempuan', name: 'Perempuan' }]}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        {/* AUTOCOMPLETE */}
        <Input
          rules={{ required: false }}
          name={"tempat_lahir"}
          control={control}
          label={"Tempat Lahir"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <DateInput
          rules={{ required: false }}
          name={'tanggal_lahir'}
          control={control}
          label={'Tanggal Lahir'}
          sx={{ gridColumn: "span 6" }}
        />
        <Select
          name={'agama'}
          control={control}
          label={'Agama'}
          options={agama.length > 0 ? agama.map((e) => ({ id: e.agama, name: e.agama })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Input
          rules={{ required: false }}
          name={"no_hp"}
          control={control}
          label={"Nomor WhatsApp"}
          defaultValue={""}
          type={"number"}
          sx={{ gridColumn: "span 6" }}
        />
        <Input
          rules={{ required: false }}
          name={"asal_sekolah"}
          control={control}
          label={"Asal Sekolah"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'rencana_tinggal'}
          control={control}
          label={'Rencana Tinggal'}
          options={optionsRencanaTinggal}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        <Input
          rules={{ required: false }}
          name={"jml_saudara"}
          control={control}
          label={"Jumlah Saudara Kandung"}
          defaultValue={""}
          type={"number"}
          sx={{ gridColumn: "span 14" }}
        />
        <Input
          rules={{ required: false }}
          name={"anak_ke"}
          control={control}
          label={"Anak Ke"}
          defaultValue={""}
          type={"number"}
          sx={{ gridColumn: "span 6" }}
        />
        <Divider sx={{ gridColumn: "span 20" }}>Alamat Pendaftar</Divider>
        {/* AUTOCOMPLETE */}
        <AutoComplete
          name={"provinsi"}
          control={control}
          label={"Provinsi"}
          options={provinsi.length ? provinsi.map((e) => ({ id: e.id_provinsi, name: e.nama_provinsi })) : []}
          rules={{ required: false }}
          defaultValue={null}
          sx={{ gridColumn: "span 14" }}
        />
        <AutoComplete
          name={"kabupaten"}
          control={control}
          label={"Kabupaten / Kota"}
          options={kabupaten.length ? kabupaten.map((e) => ({ id: e.id_kabupaten, name: e.nama_kabupaten })) : []}
          rules={{ required: false }}
          disabled={watch('provinsi') ? false : true}
          defaultValue={null}
          sx={{ gridColumn: "span 6" }}
        />
        <AutoComplete
          name={"kecamatan"}
          control={control}
          label={"Kecamatan"}
          options={kecamatan.length ? kecamatan.map((e) => ({ id: e.id_kecamatan, name: e.nama_kecamatan })) : []}
          rules={{ required: false }}
          disabled={watch('kabupaten') ? false : true}
          defaultValue={null}
          sx={{ gridColumn: "span 14" }}
        />
        <AutoComplete
          name={"kelurahan"}
          control={control}
          label={"Kelurahan"}
          options={kelurahan.length ? kelurahan.map((e) => ({ id: e.id_kelurahan, name: e.nama_kelurahan })) : []}
          rules={{ required: false }}
          disabled={watch('kecamatan') ? false : true}
          defaultValue={null}
          sx={{ gridColumn: "span 6" }}
        />
        <Input
          rules={{ required: false }}
          name={"dusun"}
          control={control}
          label={"Dusun"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Input
          rules={{ required: false }}
          name={"rt"}
          control={control}
          label={"RT"}
          defaultValue={""}
          sx={{ gridColumn: "span 3" }}
        />
        <Input
          rules={{ required: false }}
          name={"rw"}
          control={control}
          label={"RW"}
          defaultValue={""}
          sx={{ gridColumn: "span 3" }}
        />
        <Input
          rules={{ required: false }}
          name={"alamat"}
          control={control}
          label={"Detail Alamat"}
          defaultValue={""}
          sx={{ gridColumn: "span 20" }}
          multiline
          rows={4}
        />

        <Divider sx={{ gridColumn: "span 20" }}>Data Orang Tua</Divider>

        <Input
          rules={{ required: false }}
          name={"nama_ayah"}
          control={control}
          label={"Nama Lengkap Ayah"}
          defaultValue={""}
          sx={{ gridColumn: "span 20" }}
        />
        <Input
          rules={{ required: false }}
          name={"nik_ayah"}
          control={control}
          label={"NIK Ayah"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'pendidikan_ayah'}
          control={control}
          label={'Pendidikan Terakhir Ayah'}
          options={pendidikan_terakhir.length > 0 ? pendidikan_terakhir.map((e) => ({ id: e.pend_terakhir, name: e.pend_terakhir })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        {/* AUTOCOMPLETE */}
        <Input
          rules={{ required: false }}
          name={"tempat_lahir_ayah"}
          control={control}
          label={"Tempat Lahir Ayah"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <DateInput
          rules={{ required: false }}
          name={'tanggal_lahir_ayah'}
          control={control}
          label={'Tanggal Lahir Ayah'}
          sx={{ gridColumn: "span 6" }}
        />
        <Select
          name={'pekerjaan_ayah'}
          control={control}
          label={'Pekerjaan Ayah'}
          options={pekerjaan_orangtua.length > 0 ? pekerjaan_orangtua.map((e) => ({ id: e.pekerjaan, name: e.pekerjaan })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Input
          rules={{ required: false }}
          name={"no_hp_ayah"}
          control={control}
          label={"Nomor WhatsApp Ayah"}
          defaultValue={""}
          type={"number"}
          sx={{ gridColumn: "span 6" }}
        />
        {/* Form Ibu */}
        <Input
          rules={{ required: false }}
          name={"nama_ibu"}
          control={control}
          label={"Nama Lengkap Ibu"}
          defaultValue={""}
          sx={{ gridColumn: "span 20" }}
        />
        <Input
          rules={{ required: false }}
          name={"nik_ibu"}
          control={control}
          label={"NIK Ibu"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Select
          name={'pendidikan_ibu'}
          control={control}
          label={'Pendidikan Terakhir Ibu'}
          options={pendidikan_terakhir.length > 0 ? pendidikan_terakhir.map((e) => ({ id: e.pend_terakhir, name: e.pend_terakhir })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 6" }}
        />
        {/* AUTOCOMPLETE */}
        <Input
          rules={{ required: false }}
          name={"tempat_lahir_ibu"}
          control={control}
          label={"Tempat Lahir Ibu"}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <DateInput
          rules={{ required: false }}
          name={'tanggal_lahir_ibu'}
          control={control}
          label={'Tanggal Lahir Ibu'}
          sx={{ gridColumn: "span 6" }}
        />
        <Select
          name={'pekerjaan_ibu'}
          control={control}
          label={'Pekerjaan Ibu'}
          options={pekerjaan_orangtua.length > 0 ? pekerjaan_orangtua.map((e) => ({ id: e.pekerjaan, name: e.pekerjaan })) : []}
          rules={{ required: false }}
          defaultValue={""}
          sx={{ gridColumn: "span 14" }}
        />
        <Input
          rules={{ required: false }}
          name={"no_hp_ibu"}
          control={control}
          label={"Nomor WhatsApp Ibu"}
          defaultValue={""}
          type={"number"}
          sx={{ gridColumn: "span 6" }}
        />

      </Box>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
//   nomorWaIbu: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required")

export default DaftarUlangForm;