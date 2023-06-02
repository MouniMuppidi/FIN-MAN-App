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
import TextInput from "./Inputs/TextInput";
import AmountInput from "./Inputs/AmountInput";
import NumberInput from "./Inputs/NumberInput";
import SelectInput from "./Inputs/SelectInput";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const InputsDialog = ({ open, setOpen, title, inputsData, onSubmit, error, customMsg }) => {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        sx={{ "& .MuiPaper-root": { width: "500px" } }}
        PaperProps={{
          style: {
            borderRadius: "20px",
            // backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <DialogContent>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: "15px" }}
          >
            {title}
          </Typography>
          <div>
            {inputsData.map((input) => {
              return input.type === "text" ? (
                <TextInput
                  label={input.label}
                  type={input.type}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder={input.placeholder}
                  error={error}
                  disabled={input.disabled}
                />
              ) : input.type === "amount" ? (
                <AmountInput
                  label={input.label}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder={input.placeholder}
                  error={error}
                  disabled={input.disabled}
                />
              ) : input.type === "select" ? (
                <SelectInput
                  label={input.label}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder={input.placeholder}
                  error={error}
                  options={input.options}
                  disabled={input.disabled}
                />
              ) : (
                <NumberInput
                  label={input.label}
                  type={input.type}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder={input.placeholder}
                  error={error}
                  disabled={input.disabled}
                />
              );
            })}
          </div>
          {error && <Typography sx={{ color: "red", textAlign: "center", margin: "10px 0px" }}>{customMsg ? customMsg : "Please fill required fields"}</Typography>}
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}><Button onClick={onSubmit} variant="contained">Submit</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InputsDialog;
