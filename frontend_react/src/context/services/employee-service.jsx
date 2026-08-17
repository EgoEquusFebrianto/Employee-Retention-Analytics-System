/** 
 * @import {
 *   EmployeePredictionListResponse,
 *   HighRiskEmployeeResponse,
 *   EmployeePredictionDetailResponse
 * } from "../context-type/employee.type"
 */

import API from "./api";


export const EmployeeService = {

    /**
     * Mengambil daftar employee beserta hasil prediksi.
     *
     * Endpoint:
     * GET /employees/predictions
     *
     * @param {string|null} model
     * @param {number} page
     *
     * @returns {Promise<EmployeePredictionListResponse>}
     */
    getEmployees: async (
        model = null,
        page = 1,
    ) => {

        const response = await API.get(
            "/employees/predictions",
            {
                params: {
                    page,
                    ...(model && { model }),
                }
            }
        );

        return response.data;
    },


    /**
     * Mengambil employee dengan tingkat risiko HIGH.
     *
     * Endpoint:
     * GET /employees/high-risk
     *
     * @param {string} model
     * @param {number} page
     *
     * @returns {Promise<HighRiskEmployeeResponse>}
     */
    getHighRiskEmployees: async (
        model,
        page = 1,
    ) => {

        const response = await API.get(
            "/employees/high-risk",
            {
                params: {
                    model,
                    page,
                }
            }
        );

        return response.data;
    },


    /**
     * Mengambil detail employee beserta hasil prediksi
     * dari seluruh model machine learning.
     *
     * Endpoint:
     * GET /employees/:employeeNumber
     *
     * @param {number} employeeNumber
     *
     * @returns {Promise<EmployeePredictionDetailResponse>}
     */
    getEmployeeDetail: async (employeeNumber) => {

        const response = await API.get(
            `/employees/${employeeNumber}`
        );

        return response.data;
    },

    importEmployees: async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await API.post("/employees/import", formData);

        return response.data;
    },
};