import React, { createContext, useCallback, useEffect, useState } from 'react'
import { EmployeeService } from './services/employee-service';

export const EmployeeContext = createContext(null);

export const EmployeeContextProvider = ({ children }) => {
    const [model, setModel] = useState("xgboost");
    const [view, setView] = useState("all");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    const fetchEmployees = useCallback(
        async () => {
            setLoading(true);
            
            try {
                let response;

                if (view === "all") {
                    response = await EmployeeService.getEmployees(model, page);
                } else if (view === "high-risk") {
                    response = await EmployeeService.getHighRiskEmployees(model, page);
                }

                setEmployees(response?.data ?? []);
                setPagination(response?.pagination ?? null);
            } catch (err) {
                console.error("Failed Fetching Employees Data:", err)
            } finally {
                setLoading(false);
            }
        }, [model, view, page]
    )

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleSetModel = (newModel) => {
        setModel(newModel);
        setPage(1);
    };

    const handleSetView = (newView) => {
        setView(newView);
        setPage(1);
    };

    const employeeValues = {
        model,
        setModel: handleSetModel,
        view,
        setView: handleSetView,
        employees,
        loading,
        page,
        setPage,
        pagination,
        fetchEmployees
    }

    return (
        <EmployeeContext.Provider value={employeeValues}>
            {children}
        </EmployeeContext.Provider>
    )
};