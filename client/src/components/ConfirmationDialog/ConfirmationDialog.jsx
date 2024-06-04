import { Button, Dialog, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = (props) => {
  const { open, handleClose, handleDialogClick, handleDelete, title } = props;

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose} onClick={handleDialogClick}>
      <DialogContent>
        <DialogContentText>{`Are you sure you want to delete this ${title}?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
