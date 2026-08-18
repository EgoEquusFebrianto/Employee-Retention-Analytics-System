import React, { useEffect, useState } from 'react'
import "./employee-page.css"
import { useEmployee } from "../../context/hook/employee-hook"
import { EmployeeToolbar } from '../../component/employee-component/employee-toolbar/employee-toolbar';
import { EmployeeTable } from '../../component/employee-component/employee-table/employee-table';
import { EmployeePagination } from '../../component/employee-pagination/employee-pagination';
import { useNavigate } from 'react-router-dom';
import { ImportEmployeeModal } from '../../component/employee-import/employee-import';
import { useDashboard } from "../../context/hook/dashboard-hook"

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
    importLoading,
    statusImport,
    setStatusImport,
    importEmployees,
    fetchEmployees,
  } = useEmployee();

  const {
    fetchDashboard
  } = useDashboard(); 

  const navigate = useNavigate();
  const [showImportModal, setShowImportModal] = useState(false);

  const onImportHandle = async (file) => {
    try {  
      await importEmployees(file);
      // setShowImportModal(false);
    } catch (err) {

    }
  };

  // console.log(statusImport)

  return (
    <div className='employee-page'>
      <div className='employee-page-header'>
        <div>
          <h1>Employees</h1>
          <p>Monitoring employee predictions and attrition risk.</p>
        </div>

        <button
          type='button'
          onClick={() => setShowImportModal(true)}
          className='employee-import-button'
        >
          Import Employees
        </button>
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
          <>
            <EmployeeTable
              employees={employees}
              onEmployeeClick={(employeeNumber) => {
                navigate(`/employees/${employeeNumber}`);
              }}
            />

            <EmployeePagination 
              page={page}
              pagination={pagination}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <ImportEmployeeModal 
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={onImportHandle}
        loading={importLoading}
        result={statusImport}
        onDoneBegin={() => setStatusImport({})}
        loadingData={() => {
          fetchEmployees();
          fetchDashboard();
        }}
      />
    </div>
  )
}