import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Outlet } from "react-router-dom";
import Beranda from "./scenes/beranda";
import SiswaTerdaftar from "./scenes/siswaTerdaftar";
import RequireAuth from './utils/RequireAuth';
import ToLogin from './utils/ToLogin';
import LoginForm from './scenes/LoginForm/LoginForm';
import Initial from './utils/Initial';
import CustomizedSnackbar from './components/common/CustomizedSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/authSlice';

function App() {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [theme, colorMode] = useMode();

  React.useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomizedSnackbar />
        <Routes>
          <Route path="/" element={<Outlet />}>
            {/* Public */}
            <Route path="/login" element={<LoginForm />} />
            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              {/* <Route path='*' element={<NotFound />} /> */}
              <Route path="/" element={<Initial />} />
              <Route path='/beranda' element={<Beranda />} />
              <Route path='/siswa_terdaftar' element={<SiswaTerdaftar />} />
            </Route>
            <Route path='*' element={<ToLogin />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )

}

export default App;
