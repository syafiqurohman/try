import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../features/notificationSlice";

const CustomizedSnackbar = () => {
    const dispatch = useDispatch();
    const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(state => state.notification);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setNotification({ snackbarOpen: false, snackbarType, snackbarMessage }));
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={snackbarType}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbar;