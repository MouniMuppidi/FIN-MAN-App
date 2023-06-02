import React from "react";
import Header from "../../components/Header";
import { Backdrop, Typography } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputsDialog from "../../components/InputsDialog";
import LevelCompletedDialog from "../../components/LevelCompletedDialog";

const LevelTwo = () => {
    const [open, setOpen] = useState(false)
    const [inputOpen, setInputOpen] = useState(false);
    const [levelOpen, setLevelOpen] = useState(false);
    const [details, setDetails] = useState({
        buyType: "using savings",
        loanAmount: "",
        interestRate: "",
        totalPaymentsRequired: "",
        savingsAmountUsed: ""
    })
    const [paymentDetails, setPaymentDetails] = useState({ MonthlyPayment: 0, totalPayment: 0 })
    const [customTexts, setCustomTexts] = useState([])
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const localdetails = JSON.parse(localStorage.getItem("courseLoanDetails"))

    console.log("local details", localdetails)

    useEffect(() => {
        if (!localdetails) {
            navigate("/")
        }
        setOpen(true)
    }, [])

    const handleChange = (name, value) => {
        setError(false)
        setDetails((values) => {
            return { ...values, [name]: value }
        })
    }

    const inputsData = [
        {
            label: "How you are gonna buy your car:",
            type: "select",
            options: ["using savings", "using loan"],
            value: details.buyType,
            onChange: (e) => handleChange("buyType", e.target.value),
        },
        {
            label: "Enter loan amount taken for the course ($):*",
            type: "number",
            placeholder: "10000",
            value: details.loanAmount,
            disabled: details.buyType == "using loan" ? false : true,
            onChange: (e) => handleChange("loanAmount", e.target.value),
        },
        {
            label: "Enter interest rate per year (%):*",
            type: "number",
            placeholder: "5",
            value: details.interestRate,
            disabled: details.buyType == "using loan" ? false : true,
            onChange: (e) => handleChange("interestRate", e.target.value),
        },
        {
            label: "Enter total number of payments required to complete loan in years:*",
            type: "number",
            placeholder: "2",
            value: details.totalPaymentsRequired,
            disabled: details.buyType == "using loan" ? false : true,
            onChange: (e) => handleChange("totalPaymentsRequired", e.target.value),
        },
        {
            label: `Enter amount used to buy car from savings:* (your savings - ${localdetails.savingsAmount.toFixed(2)}) `,
            type: "number",
            placeholder: "2000",
            value: details.savingsAmountUsed,
            max: localdetails.savingsAmount,
            disabled: details.buyType == "using savings" ? false : true,
            onChange: (e) => handleChange("savingsAmountUsed", e.target.value),
        },
    ];

    const onInputSubmit = () => {
        console.log("inside")
        if (details.buyType == "using savings") {
            if (details.savingsAmountUsed && Number(details.savingsAmountUsed) < localdetails.savingsAmount) {
                setCustomTexts([
                    "You have been rewarded with 5 points for buying car using savings amount"
                ])
                setLevelOpen(true)
            } else {
                setError(true)
            }
        } else {
            if (details.interestRate && details.loanAmount && details.totalPaymentsRequired) {
                const MonthlyPayment = (Number(details.loanAmount) * ((Number(details.interestRate) / 100) / 12)) / (1 - Math.pow((1 + (Number(details.interestRate) / 100) / 12), (-Number(details.totalPaymentsRequired) * 12)))
                const totalPayment = MonthlyPayment * Number(details.totalPaymentsRequired) * 12
                console.log("payments", MonthlyPayment, totalPayment)
                setPaymentDetails({ MonthlyPayment, totalPayment })
                setCustomTexts([
                    `You took a loan to buy a car, so the debt increases to ${(totalPayment + localdetails.totalPayment).toFixed(2)}`,
                    `You are rewarded with 0 points for using a loan`
                ])
                setLevelOpen(true)
            } else {
                setError(true)
            }
        }
    }

    const carClick = () => {
        setInputOpen(true)
    }

    const closeCompletedDialog = () => {
        localStorage.setItem("courseLoanDetails", JSON.stringify({ ...localdetails, ["MonthlyPayment"]: localdetails.MonthlyPayment + Number(paymentDetails.MonthlyPayment), ["totalPayment"]: localdetails.totalPayment + Number(paymentDetails.totalPayment), ["savingsAmount"]: localdetails.savingsAmount - Number(details.savingsAmountUsed), rewards: details.buyType == "using savings" ? Number(localdetails.rewards) + 5 : localdetails.rewards, ["carLoanTerm"]: details.totalPaymentsRequired }))
        navigate("/levelthree")
    }

    return (
        <div>
            <Header />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
                open={open}
            >
                <div style={{ width: "60%" }}>
                    <div style={{ backgroundColor: "white", padding: "15px" }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "black", textAlign: "center" }}>Select your choice of car to buy during graduation</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <div style={{ width: "48%", cursor: "pointer" }} onClick={carClick}>
                            <img src="/images/new-car.jpg" style={{ width: "100%", height: "400px" }} />
                            <Typography sx={{ textAlign: "center", backgroundColor: "white", padding: "10px", color: "black" }}>New Car</Typography>
                        </div>
                        <div style={{ width: "48%", cursor: "pointer" }} onClick={carClick} >
                            <img src="/images/used-car.jpg" style={{ width: "100%", height: "400px" }} />
                            <Typography sx={{ textAlign: "center", backgroundColor: "white", padding: "10px", color: "black" }}>Used Car</Typography>
                        </div>
                    </div>
                </div>
            </Backdrop>
            <InputsDialog open={inputOpen} setOpen={setInputOpen} title={"Car Details"} inputsData={inputsData} onSubmit={onInputSubmit} error={error} customMsg={details.buyType == "using savings" && details.savingsAmountUsed && Number(details.savingsAmountUsed) > localdetails.savingsAmount ? "Amount should be lesser than or equal to savings amount" : ""} />
            <LevelCompletedDialog open={levelOpen} setOpen={setLevelOpen} levelNumber={"2"} customTexts={customTexts} closeCompletedDialog={closeCompletedDialog} />
        </div>
    )
}

export default LevelTwo