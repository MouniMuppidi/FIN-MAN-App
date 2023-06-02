import React from "react";
import { Typography } from "@mui/material"
import { salaryAverages } from "../../Data/SalaryAverages";
const AllLevelsCompleted = () => {
    const localdetails = JSON.parse(localStorage.getItem("courseLoanDetails"))

    const findCombinedSalary = (years) => {
        const averageSalary = salaryAverages.find((salary) => salary.degree === localdetails.courseName)
        const salary = localdetails.courseType == "under-graduate" ? averageSalary.bachelorAvgSalary : averageSalary.masterAvgSalary
        let combinedsalary = 0
        while (years > 0) {
            combinedsalary = combinedsalary + (Number(salary) - Number(localdetails.averageDebtAfterGraduation))
            console.log("combined salary", combinedsalary, years)
            years = years - 1
        }
        return combinedsalary.toFixed(2)
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
            <div style={{ backgroundColor: "white", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "70%" }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight={"bold"}
                >{`All levels completed successfully`}</Typography>
                <img src={"/images/completed_gif_new.gif"} style={{ width: "30%", height: "30%" }} />
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>Student combined salary after deducting loan amount for <span style={{ fontWeight: "bold" }}> 1 year</span> is <span style={{ fontWeight: "bold" }}>{findCombinedSalary(1)}</span> </Typography>
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>Student combined salary after deducting loan amount for <span style={{ fontWeight: "bold" }}>3 year</span> is <span style={{ fontWeight: "bold" }}>{findCombinedSalary(3)}</span> </Typography>
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>Student combined salary after deducting loan amount for <span style={{ fontWeight: "bold" }}>5 year</span> is <span style={{ fontWeight: "bold" }}>{findCombinedSalary(5)}</span> </Typography>
                <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>The Total Rewards  is <span style={{ fontWeight: "bold" }}>{localdetails.rewards}</span></Typography>
            </div>
        </div>
    )
}
export default AllLevelsCompleted