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
    const [employeeDetail, setEmployeeDetail] = useState({});

    const [statusImport, setStatusImport] = useState({});
    const [importLoading, setImportLoading] = useState(false);

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

    const fetchEmployeeDetail = useCallback(
        async (employeeNumber) => {
            try {
                setLoading(true);
                
                const response = await EmployeeService.getEmployeeDetail(employeeNumber);

                setEmployeeDetail(response.data);
            } catch (err) {
                console.error("Error fetching employee detail: ", err)
            } finally {
                setLoading(false);
            }
        }, []
    );

    const importEmployees = useCallback(
        async (file) => {            
            setImportLoading(true);
            try {
                const response = await EmployeeService.importEmployees(file);
                setStatusImport(response);
            } catch (err) {
                console.error("Export Data Failed:", err)
            } finally {
                setImportLoading(false);
            }
        }, []
    );

    const employeeValues = {
        model,
        setModel: handleSetModel,
        view,
        setView: handleSetView,
        employees,
        employeeDetail,
        loading,
        page,
        setPage,
        pagination,
        fetchEmployees,
        fetchEmployeeDetail,

        importLoading,
        statusImport,
        importEmployees,
    }

    return (
        <EmployeeContext.Provider value={employeeValues}>
            {children}
        </EmployeeContext.Provider>
    )
};