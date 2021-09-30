import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { clearErrorMessage, useErrorMessage } from "../../reducers/errors";
import { useDispatch } from "react-redux";

export default function CentralizedErrorDialog() {
  const errorMessage = useErrorMessage()

  const dispatch = useDispatch()

  const handleClose = () => dispatch(clearErrorMessage())

  return (
    <>
      <Dialog
        suppressHydrationWarning
        open={Boolean(errorMessage)}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SentimentVeryDissatisfiedIcon style={{ fontSize: "5em" }} />
          </div>
        </DialogTitle>
        <DialogContent>
          {errorMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
