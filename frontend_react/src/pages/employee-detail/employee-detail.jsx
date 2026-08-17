import React, { useEffect } from 'react'
import "./employee-detail.css"
import { useParams } from 'react-router-dom'
import { useEmployee } from '../../context/hook/employee-hook';
import { EmployeePredictionCards } from '../../component/employee-detail-cards/employee-detail-cards';
import { EmployeeInformation } from '../../component/employee-detail-information/employee-detail-information';

export const EmployeePageDetail = () => {
    const {employeeNumber} = useParams();

    const {
        employeeDetail,
        loading,
        fetchEmployeeDetail
    } = useEmployee();
    
    useEffect(()=> {
        fetchEmployeeDetail(employeeNumber);
    }, [fetchEmployeeDetail])

    if (loading) {
        return (
            <div className='employee-detail-page'>
                Loading employee detail...
            </div>
        );
    }

    if (!employeeDetail?.employee) {
        return (
            <div className='employee-detail-page'>
                Employee data not found.
            </div>
        );
    }

    const {employee, predictions} = employeeDetail;

    return (
        <div className='employee-detail-page'>
            <div className='employee-detail-header'>
                <div>
                    <h1>
                        Employee #{employee?.employee_number}
                    </h1>

                    <p>
                        {employee.department} . {employee.job_role} . Age {employee.age}
                    </p>

                    <EmployeePredictionCards predictions={predictions}/>

                    <EmployeeInformation employee={employee}/>
                </div>
            </div>
        </div>
  )
}
