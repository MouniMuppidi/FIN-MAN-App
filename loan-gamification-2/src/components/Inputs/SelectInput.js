import React from "react";
import { TextField, Typography, OutlinedInput, Select, MenuItem } from "@mui/material";

const SelectInput = ({ label, value, onChange, placeholder, error, options, disabled }) => {
    return (
        <div>
            <Typography sx={{ marginBottom: "5px", marginTop: "10px" }}>
                {label}
            </Typography>
            <Select
                disabled={disabled}
                error={error && value == "" ? true : false}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                        padding: "10px",
                    },
                }}
            >
                {
                    options.map((option) => {
                        return (
                            <MenuItem value={option}>{option}</MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    );
};

export default SelectInput;
