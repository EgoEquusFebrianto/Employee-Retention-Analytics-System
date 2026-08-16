/** @import { JobRoleRisk } from "../../../context/context-type/dashboard.type" */
import React from 'react'
import "./job-role-risk.css"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


/**
 * @typedef {Object} JobRoleRiskProps
 * 
 * @property {JobRoleRisk[]} data
 * 
 */

/**
 * 
 * @param {JobRoleRiskProps} param0
 * 
 * @returns {React.JSX.Element} 
 */
export const JobRoleRisk = ({data}) => {
    if (!data || data.length === 0) {
        return (
            <section className='job-role-risk-card'>
                <div className='dashboard-section-header'>
                    <h2>Job Role Risk</h2>
                    <p>No job role risk data available.</p>
                </div>
            </section>
        );
    }

    const chardData = [...data].sort(
        (a, b) => b.predicted_attrition - a.predicted_attrition
    );

    return (
        <section className='job-role-risk-card'>
            <div className='dashboard-section-header'>
                <div>
                    <h2>Job Role Risk Analysis</h2>
                    <p>Predicted attrition across job roles.</p>
                </div>
            </div>
            
            <div className='job-role-chart'>
                <ResponsiveContainer
                    width={"100%"}
                    height={420}
                >
                    <BarChart
                        data={chardData}
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
                            dataKey={"job_role"}
                            width={180}
                        />

                        <Tooltip />

                        <Bar 
                            dataKey={"predicted_attrition"}
                            name={"Predicted Atrition"}
                            fill='#2563eb'
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='job-role-summary'>
                {chardData.map((item) => (
                    <div className='job-role-summary-item' key={item.job_role}>
                        <div className='job-role-summary-header'>
                            <span>{item.job_role}</span>
                            <strong>{item.predicted_attrition}</strong>
                        </div>

                        <div className='job-role-summary-details'>
                            <span>{item.high_risk} high risk</span>
                            <span>{item.total_employees.toLocaleString()} employees</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
