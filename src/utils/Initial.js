import * as React from 'react'
import { CircularProgress, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Initial = () => {
    const { isSuccess } = useSelector(state => state.auth);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/beranda', { replace: true });
            }, 2000)
        }
    }, [navigate, isSuccess]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', backgroundColor: '#fff' }}
        >
            <Grid item xs={3}>
                <CircularProgress />
            </Grid>
        </Grid>
    );
}

export default Initial;