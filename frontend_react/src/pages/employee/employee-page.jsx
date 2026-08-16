import React, { useEffect, useState } from 'react'
import "./employee-page.css"
import { useEmployee } from "../../context/hook/employee-hook"
import { EmployeeToolbar } from '../../component/employee-component/employee-toolbar/employee-toolbar';
import { EmployeeTable } from '../../component/employee-component/employee-table/employee-table';

export const EmployeePage = () => {
  const {
    model,
    setModel,
    view,
    setView,
    employees,
    loading,
    page,
    setPage,
    pagination,
  } = useEmployee();

  console.log(employees)

  return (
    <div className='employee-page'>
      <div className='employee-page-header'>
        <div>
          <h1>Employees</h1>
          <p>Monitoring employee predictions and attrition risk.</p>
        </div>
      </div>

      <EmployeeToolbar
        model={model}
        onModelChange={setModel}
        view={view}
        onViewChange={setView}
      />

      <div className='employee-context'>
        {loading && (
          <p>
            Loading Employees...
          </p>
        )}

        {!loading && (
          <EmployeeTable
            employees={employees}
            onEmployeeClick={(employeeNumber) => {
              console.log("Selected employee:", employeeNumber);
            }}
          />
        )}
      </div>
    </div>
  )
}