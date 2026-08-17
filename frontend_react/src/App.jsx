import { useEffect, useState } from 'react'

import './App.css'
import { AppLayout } from './component/app-layout/app-layout'
import { Dashboard } from './pages/dashboard/dashboard'
import { SummaryCard } from './component/dashboard-component/summary-card/summary-card'
import { useDashboard } from './context/hook/dashboard-hook'
import { Route, Routes } from 'react-router-dom'
import { EmployeePage } from './pages/employee/employee-page'
import { EmployeePageDetail } from './pages/employee-detail/employee-detail'

function App() {
   
  return (
    <Routes>
      <Route element={<AppLayout />}
      >
        <Route path='/' element={<Dashboard />} />
        <Route path='/employees' element={<EmployeePage />} />
        <Route path='/employees/:employeeNumber' element={<EmployeePageDetail />}/>
      </Route>
    </Routes>
  )
}

export default App