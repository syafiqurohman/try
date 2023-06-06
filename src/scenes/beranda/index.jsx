import * as React from 'react';
import { Box, useTheme, IconButton, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/common/Header";
import StatBox from "../../components/common/StatBox";
import Layout from '../global/Layout';
import columns from './columns';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { updateLoading } from '../../features/themeSlice';
import { setPagePendaftar, setPageSizePendaftar, setPendaftar, setStatusPendaftar } from '../../features/pendaftarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../features/notificationSlice';
import { get_all } from '../../config/api';
import CustomizedDatagrid from '../../components/common/CustomizedDatagrid';
import { setStatusPendaftarTotal, setTotalPendaftar } from '../../features/totalSlice';
import SkeletonStatBox from '../../components/common/SkeletonStatBox';
import BasicDialogs from '../../components/common/Modal/dialog';
import DaftarUlangForm from '../modal/DaftarUlangForm';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { pendaftar, pagePendaftar, pageSizePendaftar, statusPendaftar } = useSelector(state => state.pendaftar);

    const { pendaftarTotal, statusPendaftarTotal } = useSelector(state => state.total);

    const { kompetensi_keahlian } = useSelector(state => state.data);

    const { control, watch, setValue, handleSubmit } = useForm();

    const onSubmit = (props) => {
        console.log(props)
    }

    const columnsPendaftar = columns.map((e) => {
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
                                <IconButton onClick={() => setOpen(true)}>
                                    <PersonAddAltRoundedIcon sx={{ color: colors.blueAccent[600] }} />
                                </IconButton>
                                <IconButton>
                                    <DeleteRoundedIcon sx={{ color: colors.redAccent[600] }} />
                                </IconButton>
                            </Box>
                        </div>
                    );
                },
            }
        }
        return e;
    })

    const getPendaftar = React.useCallback(() => {
        const getData = () => {
            dispatch(updateLoading(true))
            get_all({ endpoint: 'pendaftar_ppdb' }).then((e) => {
                dispatch(setPendaftar(e.data))
                dispatch(setStatusPendaftar(true))
                dispatch(updateLoading(false))
            }).catch((e) => {
                dispatch(setPendaftar([]))
                dispatch(updateLoading(false))
                dispatch(setStatusPendaftar(true))
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

        if (!statusPendaftar) {
            getData()
        }
    }, [dispatch, statusPendaftar])

    React.useEffect(() => {
        getPendaftar()
    }, [getPendaftar])

    const getTotalPendaftar = React.useCallback(() => {
        const getData = () => {
            dispatch(updateLoading(true))
            get_all({ endpoint: 'total_ppdb' }).then((e) => {
                dispatch(setTotalPendaftar(e.data))
                dispatch(setStatusPendaftarTotal(true))
                dispatch(updateLoading(false))
            }).catch((e) => {
                dispatch(setTotalPendaftar([]))
                dispatch(setStatusPendaftarTotal(true))
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

        if (!statusPendaftarTotal) {
            getData()
        }
    }, [dispatch, statusPendaftarTotal])

    React.useEffect(() => {
        getTotalPendaftar()
    }, [getTotalPendaftar])

    return (
        <Layout>
            <Box m="20px" width={"100%"}>
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="BERANDA" subtitle="Selamat datang di beranda PPDB SMK Informatika" />
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
                        if (pendaftarTotal.length > 0) {
                            const cari = pendaftarTotal.find((params) => params.kompetensi_keahlian === parseInt(e.no_pk));
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
                        pageChange={setPagePendaftar}
                        pageSizeChange={setPageSizePendaftar}
                        pageSize={pageSizePendaftar}
                        page={pagePendaftar}
                        rows={pendaftar.map((item, index) => ({ ...item, index: index + 1 }))}
                        columns={columnsPendaftar}
                    />
                    <BasicDialogs
                        title="Formulir Daftar Ulang"
                        setOpen={setOpen}
                        open={open}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                    >
                        <DaftarUlangForm {...{ control, watch, setValue }} />
                    </BasicDialogs>
                </Box>
            </Box>
        </Layout >
    );
};

export default Dashboard;