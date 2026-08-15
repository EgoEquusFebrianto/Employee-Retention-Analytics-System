import React, { createContext, useCallback, useEffect, useState } from 'react'
import { DashboardService } from './services/dashboard-service';

export const DashboardContext = createContext(null);

export const DashboardContextProvider = ({ children }) => {
    const [model, setModel] = useState("xgboost");
    const [summary, setSummary] = useState(null);
    const [riskDistribution, setRiskDistribution] = useState([]);
    const [departmentRisk, setDepartmentRisk] = useState([]);
    const [jobRoleRisk, setJobRoleRisk] = useState([]);

    const [loading, setLoading] = useState(false);

    /**
     * 
     * @param {string} selectedModel 
     */
    const fetchDashboard = useCallback(
        async (selectedModel = model) => {
            try {
                setLoading(true);

                const [
                    summaryResponse,
                    riskResponse,
                    departmentResponse,
                    jobRoleResponse
                ] = await Promise.all([
                    DashboardService.getDashboardSummary(selectedModel),
                    DashboardService.getRiskDistribution(selectedModel),
                    DashboardService.getDepartmentRisk(selectedModel),
                    DashboardService.getJobRoleRisk(selectedModel)
                ])

                setSummary(summaryResponse.summary);
                setRiskDistribution(riskResponse.data);
                setDepartmentRisk(departmentResponse.data);
                setJobRoleRisk(jobRoleResponse.data)

            } catch (err) {
                console.error("Error Fetching dashboard:", err);
            } finally{
                setLoading(false);
            }
        },
        [model]
    );

    
    const refreshDashboard = useCallback(
        async () => {
            await fetchDashboard(model);
        },
        [fetchDashboard, model]
    );

    useEffect(() => {
        fetchDashboard(model);
    }, [fetchDashboard, model]);


    const contextValues = {
        summary,
        riskDistribution,
        departmentRisk,
        jobRoleRisk,
        model,
        setModel,
        loading,
        fetchDashboard,
        refreshDashboard
    };

    return (
        <DashboardContext.Provider value={contextValues}>
            {children}
        </DashboardContext.Provider>
    );
}