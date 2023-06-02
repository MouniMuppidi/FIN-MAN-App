import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Typography } from "@mui/material";

const Header = () => {
    const details = JSON.parse(localStorage.getItem("courseLoanDetails"))

    return (
        <div style={{ backgroundColor: "white", opacity: "0.7", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px" }}>
            <div><Typography sx={{fontSize: "24px",fontWeight: "bold"}}>FIN MAN</Typography></div>
            <div style={{display: "flex",  alignItems: "center"}}>
                <div style={{ display: "flex", margin: "0px 10px" }}><PersonIcon sx={{ marginRight: "5px" }} /><Typography>{details?.name}</Typography></div>
                <div style={{ display: "flex", margin: "0px 10px" }}><PaymentsIcon sx={{ marginRight: "5px" }} /><Typography>{details?.totalPayment.toFixed(2)}</Typography></div>
                <div style={{ display: "flex", margin: "0px 10px" }}><SavingsIcon sx={{ marginRight: "5px" }} /><Typography>{details?.savingsAmount.toFixed(2)}</Typography></div>
                <div style={{ display: "flex", margin: "0px 10px" }}><MilitaryTechIcon sx={{ marginRight: "5px" }} /><Typography>{details?.rewards}</Typography></div>
            </div>
        </div>
    )
}

export default Header