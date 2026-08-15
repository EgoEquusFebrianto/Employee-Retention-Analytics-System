import React from 'react'
import API from './api'

/** @import { EmployeePredictionResponse, EmployeePredictionDetailResponse } from "../context-type/employee.type" */

export const EmployeeService = {

    /**
     * 
     * @param {number} page 
     * @param string} model 
     * @returns {Promise<EmployeePredictionResponse>}
     */
    getEmployeePredictions: async (page = 1, model = null) => {
        const response = await API.get("/employees/predictions", {
            params: {
                page,
                ...(model && { model })
            }
        })
        return response.data;
    },

    /**
     * 
     * @param {number} employee_number 
     * @returns {Promise<EmployeePredictionDetailResponse>}
     */
    getEmployeePredictionDetail: async (employee_number) => {
        const response = await API.get(`/employees/${employee_number}`)

        return response.data;
    },
};