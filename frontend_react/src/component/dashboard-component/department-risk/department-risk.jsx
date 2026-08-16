/** @import { DepartmentRisk } from "../../../context/context-type/dashboard.type" */
import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import "./department-risk.css"

/**
 * @typedef {Object} DepartmentRiskProps
 * 
 * @property {DepartmentRisk[]} data 
 */

/**
 * 
 * @param {DepartmentRiskProps} param0 
 * 
 * @returns {React.JSX.Element}
 */
export const DepartmentRisk = ({data}) => {
    if (!data || data.length === 0 ) {
        return (
            <section className='department-risk-cart'>
                <div className='dashboard=section-header'>
                    <h2>Department Risk</h2>
                    <p>No department risk data available.</p>
                </div>
            </section>
        );
    }

    const chartData = [...data].sort(
        (a, b) => b.predicted_attrition - a.predicted_attrition
    );

    return (
        <section className='department-risk-card'>
            <div className='dashboard-section-header'>
                <div>
                    <h2>Department Risk Analysis</h2>
                    <p>Predicted attrition across departments.</p>
                </div>
            </div>

            <div className='department-risk-content'>
                <div className='department-chart'>
                    <ResponsiveContainer
                        width={"100%"}
                        height={300}
                    >
                        <BarChart
                            data={chartData}
                            layout='vertical'
                            margin={{
                                top: 5,
                                right: 20,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray={"3 3"}
                                horizontal={false}
                            />

                            <XAxis
                                type='number'
                                allowDecimals={false}
                            />

                            <YAxis
                                type='category'
                                dataKey={"department"}
                                width={170}
                            />
                            
                            <Tooltip />

                            <Bar
                                dataKey={"predicted_attrition"}
                                name={"Predicted Attrition"}
                                fill='#2563eb'
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='department-summary'>
                    {chartData.map((item) => (
                        <div
                            className='department-summary-item'
                            key={item.department}
                        >
                            <div className='department-summary-header'>
                                <span>{item.department}</span>
                                <strong>{item.predicted_attrition}</strong>
                            </div>

                            <div className='department-summary-details'>
                                <span>{item.high_risk} high risk</span>
                                <span>{item.total_employees.toLocaleString()} employees</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
