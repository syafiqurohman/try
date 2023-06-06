import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { updateLoading } from '../../features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAgama, setKompetensiKeahlian, setPekerjaanOrangtua, setPendidikanTerakhir, setStatusData, setSumberInformasi } from '../../features/dataSlice';
import { setNotification } from '../../features/notificationSlice';
import { get_all } from '../../config/api';

const Layout = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const { statusData } = useSelector(state => state.data);

  const getDataPPDB = React.useCallback(() => {
    const getData = () => {
      dispatch(updateLoading(true))
      get_all({ endpoint: 'data_ppdb' }).then((e) => {
        dispatch(setAgama(e.data.agama))
        dispatch(setPekerjaanOrangtua(e.data.pekerjaan_orangtua))
        dispatch(setPendidikanTerakhir(e.data.pendidikan_terakhir))
        dispatch(setSumberInformasi(e.data.sumber_informasi))
        dispatch(setKompetensiKeahlian(e.data.kompetensi_keahlian))
        dispatch(setStatusData(true))
        dispatch(updateLoading(false))
      }).catch((e) => {
        dispatch(setAgama([]))
        dispatch(setPekerjaanOrangtua([]))
        dispatch(setPendidikanTerakhir([]))
        dispatch(setSumberInformasi([]))
        dispatch(setKompetensiKeahlian([]))
        dispatch(updateLoading(false))
        dispatch(setStatusData(true))
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

    if (!statusData) {
      getData()
    }
  }, [dispatch, statusData])

  React.useEffect(() => {
    getDataPPDB()
  }, [getDataPPDB])

  return (
    // <div className='app'>
    <>
      <Sidebar />
      <div style={{ height: "100%", width: "100%" }}>
        <Topbar />
        <main className='content'>
          {children}
        </main>
      </div>
    </>
    // </div>
  )
}

export default Layout;