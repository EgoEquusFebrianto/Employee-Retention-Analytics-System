import React from 'react'
import "./employee-toolbar.css"

export const EmployeeToolbar = ({ model, onModelChange, view, onViewChange }) => {

    return (
    <div className='employee-toolbar'>
        <div className='employee-view-selector'>
            <button 
                type='button'
                className={`employee-view-button ${view === "all" ? "active" : ""}`}
                onClick={() => onViewChange("all")}
                >
                    All Employees
            </button>
            
            <button 
                type='button'
                className={`employee-view-button ${view === "high-risk" ? "active" : ""}`}
                onClick={() => onViewChange("high-risk")}
                >
                    High Risk
            </button>
        </div>

        <div className='employee-model-selector'>
            <label htmlFor='employee-model'>
                Prediction Model
            </label>

            <select
                id='employee-model'
                value={model}
                onChange={(e) => {
                    onModelChange(e.target.value);
                }}
            >
                <option value={"logistic_regression"}>
                    Logistic Regression
                </option>
                <option value={"random_forest"}>
                    Random Forest
                </option>
                <option value={"xgboost"}>
                    Xgboost
                </option>
            </select>
        </div>
    </div>
    )
}