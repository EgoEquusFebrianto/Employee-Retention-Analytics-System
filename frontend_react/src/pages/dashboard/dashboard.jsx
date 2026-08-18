import React from "react";
import "./dashboard.css";
import { useDashboard } from "../../context/hook/dashboard-hook";
import { SummaryCard } from "../../component/dashboard-component/summary-card/summary-card";
import { RiskDistribution } from "../../component/dashboard-component/risk-distribution/risk-distribution";
import { DepartmentRisk } from "../../component/dashboard-component/department-risk/department-risk";
import { JobRoleRisk } from "../../component/dashboard-component/job-role-risk/job-role-risk";

export const Dashboard = () => {
    const {
        model,
        setModel,
        loading,
        highRiskEmployees,
        summary,
        riskDistribution,
        departmentRisk,
        jobRoleRisk,
        
    } = useDashboard();

    // console.log(summary)

    return (
        <div className="dashboard">

            <div className="dashboard-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Overview of employee retention and predicted attrition risk.
                    </p>
                </div>

                <div className="model-selector">
                    <label htmlFor="model">
                        Prediction Model
                    </label>

                    <select 
                        id="model"
                        value={model}
                        onChange={(e) => {
                            setModel(e.target.value);
                        }} 
                    >
                        <option value="logistic_regression">
                            Logistic Regression
                        </option>

                        <option value="random_forest">
                            Random Forest
                        </option>

                        <option value="xgboost">
                            XGBoost
                        </option>
                    </select>
                </div>
            </div>

            {/* <div className="dashboard-placeholder">
                Dashboard content
            </div> */}

            {loading && (
                <div>
                    Loading dashboard...
                </div>
            )}

            {!loading && summary === null && (
                <div>
                    No Data Content; there may be a server issue. Please check server.
                </div>
            )}

            {!loading && summary && (
                <div className="dashboard-content">
                    <SummaryCard summary={summary} />
                    <RiskDistribution data={riskDistribution}/>
                    <DepartmentRisk data={departmentRisk}/>
                    <JobRoleRisk data={jobRoleRisk}/>
                </div>
            )}
        </div>
    );
};