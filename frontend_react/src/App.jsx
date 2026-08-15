import { useEffect, useState } from 'react'

import './App.css'
import { useEmployee } from "./context/hook/employee-hook"


function App() {
    const {
        employees,
        employeeDetail,
        loading,
        error,
        fetchEmployees,
        fetchEmployeeDetail
    } = useEmployee();

    const test = async () => {
      await fetchEmployees(1);
      await fetchEmployeeDetail(1);
    };
        
    useEffect(() => {
        test();
    }, [fetchEmployees, fetchEmployeeDetail]);

    console.log(employees)

  return (
    <div>
      TEST
    </div>
  )
}

export default App