/** @import { DashboardSummaryResponse,  DepartmentRiskResponse, RiskDistributionResponse, JobRoleRiskResponse } from "../context-type/dashboard.type" */

import React from 'react'
import API from "./api";

export const DashboardService = {
    
    /**
     * extract data summary dashboard based on ml 
     * 
     * @param {string} model
     * 
     * @returns {Promise<DashboardSummaryResponse>}
     */
    getDashboardSummary: async (model) => {
        const response = await API.get("/dashboard/summary", {
            params: { model }
        });

        return response.data; 
    },

    /**
     * Obtaining employees risk level distribution
     * 
     * @param {string} model 
     * 
     * @returns {Promise<RiskDistributionResponse>}
     */
    getRiskDistribution: async (model) => {
        const response = await API.get("/dashboard/risk-distribution", {
            params: { model }
        });

        return response.data; 
    },

    /**
     * Fetch risk analysis based on department
     * 
     * @param {string} model 
     * 
     * @returns {Promise<DepartmentRiskResponse>}
     */
    getDepartmentRisk: async (model) => {
        const response = await API.get("/dashboard/department-risk", {
            params: { model }
        });

        return response.data; 
    },

    /**
     * Fetch risk analysis based on job roles
     * 
     * @param {string} model 
     * 
     * @returns {Promise<JobRoleRiskResponse>}
     */
    getJobRoleRisk: async (model) => {
        const response = await API.get("/dashboard/job-role-risk", {
            params: { model }
        });

        return response.data; 
    },
};
