import React from 'react'
import { DashboardContextProvider } from './context/dashboard-context'
import { EmployeeContextProvider } from './context/employee-context'

export const RootProvider = ({children}) => {
  return (
    <EmployeeContextProvider>
      <DashboardContextProvider>
        {children}
      </DashboardContextProvider>
    </EmployeeContextProvider>
  )
}