import React, { forwardRef, useEffect, useState } from "react";
import "./Home.css";
import LevelCompletedDialog from "../../components/LevelCompletedDialog";
import InputsDialog from "../../components/InputsDialog";
import { Button, Dialog, DialogContent, Typography, Slide } from "@mui/material";
import { useNavigate, useNavigation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { salaryAverages } from "../../Data/SalaryAverages";


ChartJS.register(ArcElement, Tooltip, Legend);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Login() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    courseType: "under-graduate",
    noOfYearsToComplete: 4,
    additionalYearsToComplete: "",
    loanAmount: "",
    interestRate: "",
    totalPaymentsRequired: "",
    savingsAmount: "",
    courseName: ""
    // paymentsMadeTillGraduation: ""
  })
  const [paymentDetails, setPaymentDetails] = useState({ MonthlyPayment: 0, totalPayment: 0 })
  const [error, setError] = useState(false)

  const navigation = useNavigate()

  const handleChange = (name, value) => {
    setError(false)
    setDetails((values) => {
      return { ...values, [name]: value }
    })
  }

  const inputsData = [
    {
      label: "Enter your full name:*",
      type: "text",
      placeholder: "Tom Hardy",
      value: details.name,
      onChange: (e) => handleChange("name", e.target.value),
    },
    {
      label: "Enter the degree type:*",
      type: "select",
      options: ["under-graduate", "post-graduate"],
      value: details.courseType,
      onChange: (e) => {
        setError(false)
        setDetails((values) => {
          return { ...values, ["courseType"]: e.target.value, ["noOfYearsToComplete"]: e.target.value === "under-graduate" ? 4 : 2 }
        })
      },
    },
    {
      label: "Enter the degree type:*",
      type: "select",
      options: salaryAverages.map((salary) => salary.degree),
      value: details.courseName,
      onChange: (e) => handleChange("courseName", e.target.value),
    },
    {
      label: "Enter the no of years to complete course:*",
      type: "text",
      value: details.noOfYearsToComplete,
      disabled: true,
      onChange: (e) => handleChange("noOfYearsToComplete", e.target.value),
    },
    {
      label: "If needed, Enter the number of additional years to complete:*",
      type: "number",
      value: details.additionalYearsToComplete,
      disabled: false,
      onChange: (e) => handleChange("additionalYearsToComplete", e.target.value),
    },
    {
      label: "Enter loan amount taken for the course ($):*",
      type: "number",
      placeholder: "10000",
      value: details.loanAmount,
      onChange: (e) => handleChange("loanAmount", e.target.value),
    },
    {
      label: "Enter interest rate per year (%):*",
      type: "number",
      placeholder: "5",
      value: details.interestRate,
      onChange: (e) => handleChange("interestRate", e.target.value),
    },
    {
      label: "Enter total number of payments required to complete loan in years:*",
      type: "number",
      placeholder: "2",
      value: details.totalPaymentsRequired,
      onChange: (e) => handleChange("totalPaymentsRequired", e.target.value),
    },
    {
      label: "Enter amount of savings you have:",
      type: "number",
      placeholder: "500",
      value: details.savingsAmount,
      onChange: (e) => handleChange("savingsAmount", e.target.value),
    },
  ];

  const calculateTotalDebt = () => {
    if (details.name && details.interestRate && details.loanAmount && details.totalPaymentsRequired && details.courseName) {
      const MonthlyPayment = (Number(details.loanAmount) * ((Number(details.interestRate) / 100) / 12)) / (1 - Math.pow((1 + (Number(details.interestRate) / 100) / 12), (-Number(details.totalPaymentsRequired) * 12)))
      const totalPayment = MonthlyPayment * Number(details.totalPaymentsRequired) * 12
      console.log("payments", MonthlyPayment, totalPayment)
      setPaymentDetails({ MonthlyPayment, totalPayment })
      localStorage.setItem("courseLoanDetails", JSON.stringify({ MonthlyPayment, totalPayment, savingsAmount: Number(details.savingsAmount), name: details.name, rewards: "0", noOfYears: details.noOfYearsToComplete + details.additionalYearsToComplete, loanTerm: details.totalPaymentsRequired, courseName: details.courseName, courseType: details.courseType }))
      setOpen(false)
      setDetailsOpen(true)
    } else {
      setError(true)
    }
  }

  const data = {
    labels: ["Debt", "Savings"],
    datasets: [
      {
        label: 'Amount',
        data: [paymentDetails.totalPayment, details.savingsAmount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    localStorage.clear()
  }, [])

  console.log("details", details)

  return (
    <div className="login-content">
      <Typography
        className="title"
      >
        FINancial MANagement
      </Typography>
      <Button
        size="large"
        type="button"
        className="play-btn"
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          borderRadius: "50px",
          textTransform: "capitalize",
          letterSpacing: "0.8px",
          fontWeight: "bold",
          padding: "7px 30px",
          fontSize: "17px",
          borderWidth: "2.5px",
        }}
      >
        Play Now
      </Button>
      <InputsDialog open={open} setOpen={setOpen} title={"Loan Details"} inputsData={inputsData} onSubmit={calculateTotalDebt} error={error} />

      <Dialog
        open={detailsOpen}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            borderRadius: "20px",
            // backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <DialogContent>
          <div style={{ margin: "15px 0px", textAlign: "center" }}>
            <Typography >You will need to pay ${paymentDetails.MonthlyPayment.toFixed(2)} every month for {details.totalPaymentsRequired} years to payoff the debt.</Typography>
            <Typography>Total loan payable - ${paymentDetails.totalPayment.toFixed(2)}</Typography>
            <Typography>Savings - {Number(details.savingsAmount).toFixed(2)}</Typography>
          </div>
          <div style={{ height: "300px", display: "flex", justifyContent: "center" }}><Pie data={data} /></div>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}><Button variant="contained" onClick={() => {
            setDetailsOpen(false)
            navigation("/levelone")
          }}>OK</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
