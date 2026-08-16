import React from 'react'
import './summary-card.css'

/** @import { DashboardSummary } from "../../../context/context-type/dashboard.type" */

/**
 * @typedef {Object} summaryCardsProps
 * 
 * @property {DashboardSummary} summary
 */

/**
 * 
 * @param {summaryCardsProps} param0 
 * @returns {React.JSX.Element}
 */
export const SummaryCard = ({ summary }) => {
    if (!summary) return null;

    const cards = [
        {
            title: "Total Employees",
            value: summary.total_employees,
            description: "Employees analyzed"
        },
        {
            title: "Predicted Attrition",
            value: summary.predicted_attrition,
            description: "Employees predicted to leave"
        },
        {
            title: "Predicted Retention",
            value: summary.predicted_retention,
            description: "Employees predicted to stay"
        },
        {
            title: "High Risk",
            value: summary.high_risk,
            description: "Employees requiring attention"
        },
    ];

    return (
        <section className='summary-cards'>
            {cards.map((card) => (
                <article
                    className='summary-card'
                    key={card.title}
                >
                    <div className='summary-card-header'>
                        {card.title}
                    </div>

                    <div className='summary-card-value'>
                        {card.value}
                    </div>

                    <div className='summary-card-description'>
                        {card.description}
                    </div>
                </article>
            ))}
        </section>
    )
}