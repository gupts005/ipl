import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmDeleteModal = (props) => {
  console.log(props);
  return (
    <React.Fragment>
        
        <Dialog
          keepMounted
          onClose={props.handleClose}
          open={props.open}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              MatchId: {props.delete.matchId} <br />
              Name: {props.delete.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Disagree</Button>
            <Button onClick={props.handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      
    </React.Fragment>
  )
}

export default ConfirmDeleteModal;
