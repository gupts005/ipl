import React, { useEffect, useState } from 'react';
import classes from './notification.module.scss';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button, Collapse, IconButton, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const Notification = (props) => {

  const notification = useSelector((state) => state.notification.notification);
  // console.log(notification);

  useEffect(() => {

    setSnackbarState({
      open: true,
      vertical: 'top',
      horizontal: 'center',
    });
  }, [notification]);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackbarState;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({
      open: false,
      vertical: 'top',
      horizontal: 'center'
    })
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (

    <React.Fragment>

      <Slide direction="up" in={open}>
        <div className={classes.parent}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert
              severity={notification.status === 'error' ? 'error' : 'success'}
              action={action}
            >
              {/* {notification.title} */}
              {notification.message}
            </Alert>
          </Snackbar>
        </div>
      </Slide>

    </React.Fragment>
  )
}

export default Notification;