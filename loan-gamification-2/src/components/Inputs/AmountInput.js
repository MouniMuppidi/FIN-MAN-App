import React from "react";
import { TextField, Typography, OutlinedInput } from "@mui/material";

const AmountInput = ({ label, value, onChange, placeholder, error, disabled }) => {
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <div>
      <Typography sx={{ marginBottom: "5px", marginTop: "10px" }}>{label}</Typography>
      <OutlinedInput
        disabled={disabled}
        error={error && value == "" ? true : false}
        type={"text"}
        placeholder={placeholder}
        value={value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        onChange={(e) => onChange(removeNonNumeric(e.target.value))}
        fullWidth
        sx={{
          "& .MuiInputBase-input": {
            padding: "10px",
          },
        }}
      />
    </div>
  );
};

export default AmountInput;
