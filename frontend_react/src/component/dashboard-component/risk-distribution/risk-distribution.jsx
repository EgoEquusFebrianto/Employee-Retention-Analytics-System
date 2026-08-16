import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import "./risk-distribution.css"

/** @import { RiskDistribution } from "../../../context/context-type/dashboard.type" */

/**
 * @typedef {Object} RiskDistributionProps
 * 
 * @property {RiskDistribution[]} data
 */

/**
 * 
 * @param {RiskDistributionProps} param0 
 * 
 * @returns {React.JSX.Element}
 */
export const RiskDistribution = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <section className='risk-distribution-card'>
                <div className='dashboard-section-header'>
                    <h2>Risk Distribution</h2>
                    <p>No risk distribution data available.</p>
                </div>
            </section>
        );
    }    

    const totalEmployees = data.reduce(
        (total, item) => total + item.total, 0
    );

    const RISK_COLORS = {
        HIGH: "#dc2626",
        MEDIUM: "#f59e0b",
        LOW: "#16a34a",
    };

    const chartData = data.map((item) => ({
        ...item,
        fill: RISK_COLORS[item.risk_level]
    }));

    return (
        <section className='risk-distribution-card'>
            <div className='dashboard-section-header'>
                <div>
                    <h2>Risk Distribution</h2>
                    <p>Employee distribution by predicted risk level.</p>
                </div>

                <span className='risk-total'>
                    {totalEmployees.toLocaleString()} employees
                </span>
            </div>

            <div className='risk-distribution-content'>
                <div className='risk-chart'>
                    <ResponsiveContainer 
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey={"total"}
                                nameKey={"risk_level"}
                                cx={"50%"}
                                cy={"50%"}
                                innerRadius={"60%"}
                                outerRadius={"80%"}
                                paddingAngle={2}
                            />
                            
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className='risk-chart-center'>
                        <strong>
                            {totalEmployees.toLocaleString()}
                        </strong>

                        <span>
                            Employees
                        </span>
                    </div>
                </div>

                <div className='risk-legend'>
                    {data.map((item) => {
                        const percentage = (item.total / totalEmployees) * 100;

                        return (
                            <div className='risk-legend-item' key={item.risk_level}>
                                <div className='risk-legend-label'>
                                    <span 
                                        className={`risk-indicator risk-${item.risk_level.toLocaleLowerCase()}`}
                                    />
                                    <span className='risk-legend-label-content'>{item.risk_level}</span>
                                </div>

                                <div className='risk-legend-value'>
                                    <strong>
                                        {item.total.toLocaleString()}
                                    </strong>

                                    <span>
                                        {percentage.toFixed1}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
