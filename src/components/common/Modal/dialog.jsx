import * as React from 'react';
import PropTypes from 'prop-types';
import { tokens } from "../../../theme";
import { IconButton, Button, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function BasicDialogs({ handleSubmit, children, setOpen, open, title, onSubmit }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle sx={{ fontWeight: "bold" }} id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            {children}
          </DialogContent>
          <DialogActions>
            <Button autoFocus type='submit'
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.primary[100],

              }}>
              <SaveRoundedIcon sx={{ mr: "5px" }} />
              Simpan
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}