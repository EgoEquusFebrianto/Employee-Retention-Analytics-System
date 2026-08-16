import React from 'react'
import "./employee-table.css"
import { FiArrowRight } from 'react-icons/fi';

export const EmployeeTable = ({ employees, onEmployeeClick }) => {
    if (!employees || employees.length === 0) {
        return (
            <div className='employee-table-empty'>
                No employee data available.
            </div>
        );
    }
    console.log(employees)
    return (
    <div className='employee-table-container'>
        <div className='employee-table-wrapper'>
            <table className='employee-table'>
                <thead>
                    <th>Employee</th>
                    <th>Deparment</th>
                    <th>Job Role</th>
                    <th>Prediction</th>
                    <th>Probability</th>
                    <th>Risk</th>
                    <th></th>
                </thead>
                
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employee_number}>
                            <td>
                                <div className='employee-name'>
                                    #{employee.employee_number}
                                </div>
                                <div className='employee-age'> Age {employee.age}</div>
                            </td>
                            <td>{employee.department}</td>
                            <td>{employee.job_role}</td>
                            <td>
                                <span
                                    className={`prediction-value ${employee.prediction === "Yes" ? "prediction-yes": "prediction-no"}`}
                                >
                                    {employee.prediction}
                                </span>
                            </td>
                            <td>{(employee.probability * 100).toFixed(1)}%</td>
                            <td>
                                <span
                                    className={`risk-badge risk-${employee.risk_level.toLowerCase()}`}
                                >
                                    {employee.risk_level}
                                </span>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    className='employee-detail-button'
                                    onClick={() => {
                                        onEmployeeClick(employee.employee_number);
                                    }}
                                    aria-label={`View employee ${employee.employee_number}`}
                                >
                                    <FiArrowRight size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}
