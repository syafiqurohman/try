import * as React from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Header from "../../components/common/Header";
import StatBox from "../../components/common/StatBox";
import KelengkapanDataForm from '../modal/KelengkapanDataForm';
import DataPrestasiForm from '../modal/DataPrestasiForm';
import Layout from '../global/Layout';
import CustomizedDatagrid from '../../components/common/CustomizedDatagrid';
import { setPageSiswa, setPageSizeSiswa, setSiswa, setStatusSiswa } from '../../features/siswaSlice';
import { updateLoading } from '../../features/themeSlice';
import { get_all } from '../../config/api';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../features/notificationSlice';
import columns from './columns';
import { setStatusTerdaftarTotal, setTotalTerdaftar } from '../../features/totalSlice';
import SkeletonStatBox from '../../components/common/SkeletonStatBox';
import BasicDialogs from '../../components/common/Modal/dialog';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [openPrestasiForm, setOpenPrestasiForm] = React.useState(false);
  const [openKelengkapanForm, setOpenKelengkapanForm] = React.useState(false);

  const { kompetensi_keahlian } = useSelector(state => state.data);

  const { terdaftarTotal, statusTerdaftarTotal } = useSelector(state => state.total);

  const { siswa, pageSiswa, pageSizeSiswa, statusSiswa } = useSelector(state => state.siswa);

  const { handleSubmit } = useForm();

  const onSubmit = (props) => {
    console.log(props)
  }

  const columnsSiswa = columns.map((e) => {
    if (e.field === 'kompetensi_keahlian') {
      return {
        ...e,
        renderCell: (params) => {
          let nama_jurusan = '-';
          if (kompetensi_keahlian.length > 0) {
            const cari = kompetensi_keahlian.find((e) => parseInt(e.no_pk) === parseInt(params.row.kompetensi_keahlian))
            if (cari) {
              nama_jurusan = cari.alias
            }
          }
          return (
            <Typography>
              {nama_jurusan}
            </Typography>
          );
        },
      }
    }
    if (e.field === 'aksi') {
      return {
        ...e,
        renderCell: ({ row: { access } }) => {
          return (
            <div>
              <Box display="flex">
                <IconButton>
                  <EditRoundedIcon sx={{ color: colors.blueAccent[600] }} />
                </IconButton>
                <IconButton onClick={() => setOpenKelengkapanForm(true)}>
                  <AssignmentIndRoundedIcon
                    sx={{ color: colors.greenAccent[600] }}
                  />
                </IconButton>
                <IconButton onClick={() => setOpenPrestasiForm(true)}>
                  <EmojiEventsRoundedIcon sx={{ color: colors.primary[100] }} />
                </IconButton>
                <IconButton>
                  <InfoRoundedIcon sx={{ color: colors.redAccent[500] }} />
                </IconButton>
              </Box>
            </div>
          );
        },
      }
    }
    return e;
  })

  const getSiswa = React.useCallback(() => {
    const getData = () => {
      dispatch(updateLoading(true))
      get_all({ endpoint: 'siswa_terdaftar' }).then((e) => {
        dispatch(setSiswa(e.data))
        dispatch(setStatusSiswa(true))
        dispatch(updateLoading(false))
      }).catch((e) => {
        dispatch(setSiswa([]))
        dispatch(updateLoading(false))
        dispatch(setStatusSiswa(true))
        dispatch(
          setNotification(
            {
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: "Failed fetch data ! Check Your Connection or Reload Page !"
            }
          ));
      })
    }

    if (!statusSiswa) {
      getData()
    }
  }, [dispatch, statusSiswa])

  React.useEffect(() => {
    getSiswa()
  }, [getSiswa])

  const getTotalTerdaftar = React.useCallback(() => {
    const getData = () => {
      dispatch(updateLoading(true))
      get_all({ endpoint: 'total_terdaftar' }).then((e) => {
        dispatch(setTotalTerdaftar(e.data))
        dispatch(setStatusTerdaftarTotal(true))
        dispatch(updateLoading(false))
      }).catch((e) => {
        dispatch(setTotalTerdaftar([]))
        dispatch(setStatusTerdaftarTotal(true))
        dispatch(updateLoading(false))
        dispatch(
          setNotification(
            {
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: "Failed fetch data ! Check Your Connection or Reload Page !"
            }
          ));
      })
    }

    if (!statusTerdaftarTotal) {
      getData()
    }
  }, [dispatch, statusTerdaftarTotal])

  React.useEffect(() => {
    getTotalTerdaftar()
  }, [getTotalTerdaftar])
  return (
    <Layout>
      <Box m="20px" width={"100%"}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="SISWA TERDAFTAR" subtitle="Daftar siswa yang telah daftar ulang" />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          {kompetensi_keahlian.length > 0 ? kompetensi_keahlian.map((e, index) => {
            let jumlah = 0;
            if (terdaftarTotal.length > 0) {
              const cari = terdaftarTotal.find((params) => params.kompetensi_keahlian === parseInt(e.no_pk));
              if (cari) {
                jumlah = cari.jumlah
              }
            }
            return (
              <React.Fragment key={index}>
                <Box
                  borderRadius="10px"
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={jumlah}
                    subtitle={e.alias}
                  // icon={
                  //   <EmailIcon
                  //     sx={{ color: colors.redAccent[600], fontSize: "26px" }}
                  //   />
                  // }
                  />
                </Box>
              </React.Fragment>
            )
          }) : (
            <React.Fragment>
              <SkeletonStatBox />
            </React.Fragment>
          )}

          {/* ROW 2 */}
          <CustomizedDatagrid
            pageChange={setPageSiswa}
            pageSizeChange={setPageSizeSiswa}
            pageSize={pageSizeSiswa}
            page={pageSiswa}
            rows={siswa.map((item, index) => ({ ...item, index: index + 1 }))}
            columns={columnsSiswa}
          />

          <BasicDialogs
            title="Kelengkapan Data"
            setOpen={setOpenKelengkapanForm}
            open={openKelengkapanForm}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          >
            <KelengkapanDataForm />
          </BasicDialogs>
          <BasicDialogs
            title="Formulir Prestasi"
            setOpen={setOpenPrestasiForm}
            open={openPrestasiForm}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          >
            <DataPrestasiForm />
          </BasicDialogs>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
