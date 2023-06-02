import React, { forwardRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Slide,
  Button,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LevelCompletedDialog = ({ open, setOpen, levelNumber, customTexts, closeCompletedDialog }) => {
  const navigate = useNavigate()
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={"bold"}
          >{`Level ${levelNumber} completed successfully`}</Typography>
          {
            customTexts.map((customText) => {
              return (
                <Typography sx={{ textAlign: "center" }} gutterBottom>{customText}</Typography>
              )
            })
          }
          <img src={"/images/completed_gif_new.gif"} style={{ width: "50%", height: "50%" }} />
          <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>Note: If you want to change choice and see different results, please go back and try</Typography>
          <div>
            <Button onClick={() => setOpen(false)} variant="contained" sx={{ marginRight: "10px" }}><ArrowBackIcon sx={{ marginRight: "5px" }} />Go Back </Button>
            <Button onClick={closeCompletedDialog} variant="contained">Next level <ArrowForwardIcon sx={{ marginLeft: "5px" }} /></Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelCompletedDialog;
