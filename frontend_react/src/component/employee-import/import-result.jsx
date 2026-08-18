import React from 'react'
import "./import-result.css"
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';


export const ImportResult = ({result, onDone}) => {
    const data = result?.data || {};
    const inserted = data.inserted ?? 0;
    const skipped = data.skipped ?? 0;

    const employeeNumbers = data.employee_numbers ?? []
    const duplicatedEmployeeNumbers = data.duplicate_employee_numbers ?? [];

    const hasSkipped = skipped > 0;
    
    return (
        <div className='import-result'>
            <div
                className={`import-result-icon ${hasSkipped ? "warning" : "success"}`}
            >
                {hasSkipped ? (
                    <FiAlertTriangle size={28} />
                ) : (
                    <FiCheckCircle size={28} />
                )}
            </div>

            <h2>
                Import Completed
            </h2>

            <p className='import-result-message'>
                {hasSkipped
                    ? "Employee data has been processed with some records skipped."
                    : "All employee records were imported successfully."
                }
            </p>

            <div className='import-result-summary'>
                <div className='import-result-stat'>
                    <span>Imported</span>
                    <strong>{inserted}</strong>
                </div>

                <div className='import-result-stat'>
                    <span>Skipped</span>
                    <strong>{skipped}</strong>
                </div>
            </div>

            {employeeNumbers.length > 0 && (
                <div className='import-result-section'>
                    <div className='import-result-section-header'>
                        <h3>Imported Employees</h3>
                        <span>{employeeNumbers.length}</span>
                    </div>

                    <div className='import-result-list'>
                        {employeeNumbers.map((employeeNumber) => (
                            <div key={employeeNumber} className='import-result-item'>
                                Employee #{employeeNumber}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {duplicatedEmployeeNumbers.length > 0 && (
                <div className='import-result-section'>
                    <div className='import-result-section-header'>
                        <h3>Duplicate Employees</h3>
                        <span>{duplicatedEmployeeNumbers.length}</span>
                    </div>

                    <div className='import-result-list'>
                        {duplicatedEmployeeNumbers.map((employeeNumber) => (
                            <div key={employeeNumber} className='import-result-item'>
                                Employee #{employeeNumber}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='import-result-footer'>
                <button
                    type='button'
                    onClick={onDone}
                >
                    Done
                </button>
            </div>
        </div>
    )
}
