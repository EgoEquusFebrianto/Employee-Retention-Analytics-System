import React, { useContext } from 'react'
import { DashboardContext } from '../dashboard-context'

/** @import { DashboardContextType } from "../context-type/dashboard.type" */

/**
 * 
 * @returns {DashboardContextType}
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardContextProvider");
  }

  return context;
}
