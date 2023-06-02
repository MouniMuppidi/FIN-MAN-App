import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Backdrop, Dialog, CircularProgress, Typography } from "@mui/material";
import InputsDialog from "../../components/InputsDialog";
import LevelCompletedDialog from "../../components/LevelCompletedDialog";

const LevelOne = () => {
    const [open, setOpen] = useState(false);
    const [inputOpen, setInputOpen] = useState(false);
    const [levelOpen, setLevelOpen] = useState(false);
    const [details, setDetails] = useState({
        jobType: "Stream aligned",
        salaryAmount: "",
        amountAllocated: "",
        savingsAmountFromSalary: ""
    })
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
            label: "Enter your job type:",
            type: "select",
            options: ["Stream aligned", "Non stream aligned"],
            value: details.jobType,
            onChange: (e) => handleChange("jobType", e.target.value),
        },
        {
            label: "Enter amount of salary you get from job per year:",
            type: "number",
            placeholder: "250",
            value: details.salaryAmount,
            onChange: (e) => handleChange("salaryAmount", e.target.value),
        },
        {
            label: "Enter amount allocated for loan till graduation:*",
            type: "number",
            placeholder: "1000",
            value: details.amountAllocated,
            onChange: (e) => handleChange("amountAllocated", e.target.value),
        },
        {
            label: "Enter expected amount to be saved till graduation from this job:*",
            type: "number",
            placeholder: "1500",
            value: details.savingsAmountFromSalary,
            onChange: (e) => handleChange("savingsAmountFromSalary", e.target.value),
        },
    ];

    const jobClick = () => {
        setInputOpen(true)
    }

    const onInputSubmit = () => {
        if (details.amountAllocated && details.jobType && details.salaryAmount && details.savingsAmountFromSalary) {
            const remaingingDebtAmount = localdetails.totalPayment - Number(details.amountAllocated)
            const remainingPaymentsToMake = remaingingDebtAmount / localdetails.MonthlyPayment
            const remainingYears = Number(localdetails.loanTerm) - Number(localdetails.noOfYears)
            const averageDebt = remainingYears > 0 ? remaingingDebtAmount / remainingYears : remaingingDebtAmount
            const paymentMadePercentage = (details.amountAllocated / localdetails.totalPayment) * 100
            setCustomTexts([
                `From the job you worked,you have contributed ${paymentMadePercentage.toFixed(0)}%`,
                `The average debt amount at graduation is ${averageDebt.toFixed(2)}`,
                `The reward for the level one is ${(paymentMadePercentage / 10).toFixed(0)} points`,
                details.jobType == "Stream aligned" ? `Extra one point reward for choosing streamlined job during the course` : ""
            ])

            setLevelOpen(true)
        } else {
            setError(true)
        }
    }

    const noJobClick = () => {
        setCustomTexts([
            "Since you are not doing any job during your course, You are not contributing to your debt",
            "The reward for the level one is 0 points"
        ])
        setLevelOpen(true)
    }

    const closeCompletedDialog = () => {
        const paymentMadePercentage = (details.amountAllocated / localdetails.totalPayment) * 100
        localStorage.setItem("courseLoanDetails", JSON.stringify({ ...localdetails, ["totalPayment"]: localdetails.totalPayment - Number(details.amountAllocated), ["savingsAmount"]: localdetails.savingsAmount + Number(details.savingsAmountFromSalary), rewards: details.jobType == "Stream aligned" ? ((paymentMadePercentage / 10) + 1).toFixed(0) : (paymentMadePercentage / 10).toFixed(0) }))
        navigate("/leveltwo")
    }

    return (
        <div>
            <Header />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
                open={open}
            >
                <div style={{ width: "80%" }}>
                    <div style={{ backgroundColor: "white", padding: "15px" }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "black", textAlign: "center" }}>Select your choice of job you had during the course</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <div style={{ width: "32%", cursor: "pointer" }} onClick={jobClick}>
                            <img src="/images/fulltime-job.jpg" style={{ width: "100%", height: "400px" }} />
                            <Typography sx={{ textAlign: "center", backgroundColor: "white", padding: "10px", color: "black" }}>Full time Job</Typography>
                        </div>
                        <div style={{ width: "32%", cursor: "pointer" }} onClick={jobClick}>
                            <img src="/images/parttime-job.png" style={{ width: "100%", height: "400px" }} />
                            <Typography sx={{ textAlign: "center", backgroundColor: "white", padding: "10px", color: "black" }}>Part time Job</Typography>
                        </div>
                        <div style={{ width: "32%", cursor: "pointer" }} onClick={noJobClick}>
                            <img src="/images/fulltime-college.jpg" style={{ width: "100%", height: "400px" }} />
                            <Typography sx={{ textAlign: "center", backgroundColor: "white", padding: "10px", color: "black" }}>No Job (Full time college)</Typography>
                        </div>
                    </div>
                </div>
            </Backdrop>
            <InputsDialog open={inputOpen} setOpen={setInputOpen} title={"Job Details"} inputsData={inputsData} onSubmit={onInputSubmit} error={error} />
            <LevelCompletedDialog open={levelOpen} setOpen={setLevelOpen} levelNumber={"1"} customTexts={customTexts} closeCompletedDialog={closeCompletedDialog}  />
        </div>
    )
}

export default LevelOne