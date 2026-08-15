import React, { createContext, useCallback, useState } from 'react'
import { EmployeeService } from './services/employee-service';

export const EmployeeContext = createContext(null);

export const EmployeeContextProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState(null);

    const [model, setModel] = useState("xgboost");
    
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    const [loading, setLoading] = useState(false);

    /**
     * @param {number} selectedPage
     */
    const fetchEmployees = useCallback(
        async (selectedPage = page) => {
            setLoading(true);

            try {
                const payload = await EmployeeService.getEmployeePredictions(selectedPage, model);
                
                setEmployees(payload.data);
                setPage(payload.pagination.page);
                setPerPage(payload.pagination.per_page);
                setTotal(payload.pagination.total)
                setTotalPages(payload.pagination.total_pages);
                setHasNext(payload.pagination.has_next);
                setHasPrevious(payload.pagination.has_previous);
            } catch (err) {
                console.error("Error fetching employees data:", err);
            } finally {
                setLoading(false);
            }
        },
        [page, model]
    );

    /**
     * 
     * @param {number} employeeNumber 
     */
    const fetchEmployeeDetail = useCallback(
        async (employeeNumber) => {
            setLoading(true);

            try {
                const payload = await EmployeeService.getEmployeePredictionDetail(employeeNumber);
                
                setEmployeeDetail(payload.data)
            } catch (err) {
                console.error("Error fetching employee detail: ", err);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const employeeValues = {
        employees,
        employeeDetail,
        model,
        setModel,
        page,
        setPage,
        perPage,
        total,
        totalPages,
        hasNext,
        hasPrevious,
        loading,
        fetchEmployees,
        fetchEmployeeDetail,
    }

    return (
        <EmployeeContext.Provider value={employeeValues}>
            {children}
        </EmployeeContext.Provider>
    )
};