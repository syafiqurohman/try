import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import LogoSMK from '../../assets/images/smk-informatika.png';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../../features/authSlice';
import { updateLoading } from '../../features/themeSlice';
import { setNotification } from '../../features/notificationSlice';
import { tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tentackle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading } = useSelector(state => state.theme);

  const { isSuccess } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (isSuccess) {
        navigate("/", { replace: true });
        dispatch(reset());
    }
}, [isSuccess, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLoading(true))
    const data = new FormData(event.currentTarget);
    dispatch(LoginUser({ username: data.get('username'), password: data.get('password') })).then((e) => {
      if (e.error) {
        dispatch(updateLoading(false))
        dispatch(
          setNotification(
            {
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: "Login Failed !\n Wrong Username or Password"
            }
          ));
      } else {
        dispatch(updateLoading(false))
        dispatch(
          setNotification(
            {
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "Login Successfully !"
            }
          ));
      }
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1rem'
          }}
        >
          <img src={LogoSMK} width="50%" alt="Deskripsi Gambar" />

          <Typography align="center" component="h1" variant="h5" sx={{ mt: 2 }} >
            PPDB SMK INFORMATIKA WONOSOBO
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />

            <FormControl sx={{ mt: 1, width: '45ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                margin="dense"
                required
                fullWidth
                name="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

              disabled={isLoading}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}