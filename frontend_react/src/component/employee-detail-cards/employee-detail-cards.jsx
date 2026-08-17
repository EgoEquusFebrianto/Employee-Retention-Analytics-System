import React from 'react'
import "./employee-detail-cards.css"

/** @import {EmployeePrediction} from "../../context/context-type/employee.type" */

/**
 * @typedef {Object} EmployeeDetailCardsProps
 * 
 * @property {EmployeePrediction[]} predictions
 */

/**
 * 
 * @param {EmployeeDetailCardsProps} param0 
 * @returns {React.JSX.Element}
 */
export const EmployeePredictionCards = ({ predictions }) => {
  if (!predictions.length === 0) {
    return(
      <div className='prediction-empty'>
        No prediction data available.
      </div>
    );
  }
  const modelHelper = {
    logistic_regression: "logistic regression",
    random_forest: "random forest",
    xgboost: "xgboost"
  };

  return (
    <section className='prediction-section'>
      <div className='section-heading'>
        <div>
          <h2>Precition Analysis</h2>
          <p>
            Attrition prediction generate by each machine learning.
          </p>
        </div>
      </div>

      <div className='prediction-grid'>
        {predictions.map((prediction) => {
          const probability = prediction.probability * 100;

          return (
            <div
              key={prediction.model}
              className='prediction-card'
            >
              <div className='prediction-card-header'>
                <span className='prediction-model'>
                  {modelHelper[prediction.model]}
                </span>

                <span className={
                  `risk-badge risk-${prediction.risk_level.toLocaleLowerCase()}`
                }>
                  {prediction.risk_level}
                </span>
              </div>

              <div className='prediction-result'>
                <span className='prediction-label'>
                  Prediction Attrition
                </span>

                <strong className={
                  prediction.prediction === "Yes" ? "prediction-yes" : "prediction-no"
                }>
                  {prediction.prediction}
                </strong>
              </div>

              <div className='prediction-probability'>
                <div className='probability-header'>
                  <span>Probability</span>
                  <strong>{probability.toFixed(1)}%</strong>
                </div>

                <div className='probability-track'>
                  <div className={
                    `probability-bar probability-${prediction.risk_level.toLocaleLowerCase()}`
                  }
                  style={{width: `${probability}%`}}
                  />
                </div>
              </div>

              <div className='prediction-date'>
                Prediction generate: {prediction.prediction_at}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
