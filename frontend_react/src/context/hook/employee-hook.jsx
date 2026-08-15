/** @import { EmployeeContextType } from "../context-type/employee.type" */

import React, { useContext } from 'react'
import { EmployeeContext } from '../employee-context';

/**
 * 
 * @returns {EmployeeContextType}
 */
export const useEmployee = () => {
    const context = useContext(EmployeeContext);

    if (!context) {
        throw new Error("useEmployee must be used inside EmployeeContextProvider.")
    }
  
    return context;
}