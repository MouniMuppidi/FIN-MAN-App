import React from "react";
import Header from "../../components/Header";
import { Dialog, DialogContent } from "@mui/material"
import { useState } from "react";
import { salaryAverages } from "../../Data/SalaryAverages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LevelCompletedDialog from "../../components/LevelCompletedDialog";
import InputsDialog from "../../components/InputsDialog";

const LevelThree = () => {
    const [inputOpen, setInputOpen] = useState(false)
    const [customTexts, setCustomTexts] = useState([])
    const [levelOpen, setLevelOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (!localdetails) {
            navigate("/")
        }
        setInputOpen(true)
    }, [])


    const [details, setDetails] = useState({
        payType: "pay single required loan amount",
        savingAmountSalary: ""
    })
    const [error, setError] = useState(false)

    const handleChange = (name, value) => {
        setError(false)
        setDetails((values) => {
            return { ...values, [name]: value }
        })
    }
    const localdetails = JSON.parse(localStorage.getItem("courseLoanDetails"))

    const inputsData = [
        {
            label: "How you are gonna pay your loan amount:",
            type: "select",
            options: ["pay single required loan amount", "pay multiple required loan amount"],
            value: details.payType,
            onChange: (e) => handleChange("payType", e.target.value),
        },
        {
            label: "Enter amount you are gonna save from the yearly salary ($):*",
            type: "number",
            placeholder: "10000",
            value: details.savingAmountSalary,
            onChange: (e) => handleChange("savingAmountSalary", e.target.value),
        },
    ];

    const onInputSubmit = () => {
        if (details.savingAmountSalary) {
            const averageSalary = salaryAverages.find((salary) => salary.degree === localdetails.courseName)
            setCustomTexts([
                `The average salary after completing your ${localdetails.courseName} degree is ${localdetails.courseType == "under-graduate" ? averageSalary.bachelorAvgSalary : averageSalary.masterAvgSalary}`,
                `The average debt amount per year after graduation is ${(localdetails.totalPayment / Number(localdetails.carLoanTerm)).toFixed(2)}`,
                details.payType == "pay single required loan amount" ? `Since you are just paying the minimum required loan amount, You are rewarded with 5 points` : "Since you are double paying the minimum required loan amount, You are rewarded with 10 points"
            ])
            setLevelOpen(true)
        } else {
            setError(true)
        }
    }

    const closeCompletedDialog = () => {
        localStorage.setItem("courseLoanDetails", JSON.stringify({ ...localdetails, rewards: details.payType == "pay single required loan amount" ? Number(localdetails.rewards) + 5 : Number(localdetails.rewards) + 10, ["averageDebtAfterGraduation"]: localdetails.totalPayment / Number(localdetails.carLoanTerm) }))
        navigate("/alllevelscompleted")
    }

    return (
        <div>
            <Header />
            <InputsDialog open={inputOpen} setOpen={setInputOpen} title={"Salary Details"} inputsData={inputsData} onSubmit={onInputSubmit} error={error} />
            <LevelCompletedDialog open={levelOpen} setOpen={setLevelOpen} levelNumber={"3"} customTexts={customTexts} closeCompletedDialog={closeCompletedDialog} />
        </div>
    )
}

export default LevelThree