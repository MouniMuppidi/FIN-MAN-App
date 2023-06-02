import React from "react";
import { TextField, Typography, OutlinedInput } from "@mui/material";

const NumberInput = ({ label, type, value, onChange, placeholder, error, disabled }) => {
  return (
    <div>
      <Typography sx={{ marginBottom: "5px", marginTop: "10px" }}>
        {label}
      </Typography>
      <OutlinedInput
        disabled={disabled}
        error={error && value == "" ? true : false}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
        inputProps={{ min: 0}}
        sx={{
          "& .MuiInputBase-input": {
            padding: "10px",
          },
        }}
      />
    </div>
  );
};

export default NumberInput;
