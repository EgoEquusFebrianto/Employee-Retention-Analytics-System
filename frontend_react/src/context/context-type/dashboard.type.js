/**
 * @typedef {Object} DashboardSummary
 * Ringkasan utama dashboard berdasarkan model prediksi
 *
 * @property {number} total_employees
 * Jumlah seluruh employee
 *
 * @property {number} predicted_attrition
 * Jumlah employee yang diprediksi mengalami attrition
 *
 * @property {number} predicted_retention
 * Jumlah employee yang diprediksi tetap bertahan
 *
 * @property {number} high_risk
 * Jumlah employee dengan tingkat risiko HIGH
 *
 * @property {number} medium_risk
 * Jumlah employee dengan tingkat risiko MEDIUM
 *
 * @property {number} low_risk
 * Jumlah employee dengan tingkat risiko LOW
 */


/**
 * @typedef {Object} DashboardSummaryResponse
 * Response dari endpoint GET /dashboard/summary
 *
 * Contoh:
 * {
 *   model: "xgboost",
 *   status: "SUCCESS",
 *   summary: {
 *     total_employees: 1475,
 *     predicted_attrition: 165,
 *     predicted_retention: 1310,
 *     high_risk: 95,
 *     medium_risk: 93,
 *     low_risk: 1287
 *   }
 * }
 *
 * @property {string} model
 * Model machine learning yang digunakan
 *
 * @property {string} status
 * Status response dari backend
 *
 * @property {DashboardSummary} summary
 * Data ringkasan dashboard
 */


/**
 * @typedef {Object} RiskDistribution
 * Distribusi employee berdasarkan tingkat risiko
 *
 * @property {string} risk_level
 * Tingkat risiko: HIGH, MEDIUM, atau LOW
 *
 * @property {number} total
 * Jumlah employee pada tingkat risiko tersebut
 */


/**
 * @typedef {Object} RiskDistributionResponse
 * Response dari endpoint GET /dashboard/risk-distribution
 *
 * @property {RiskDistribution[]} data
 * Data distribusi risiko
 *
 * @property {string} model
 * Model machine learning yang digunakan
 *
 * @property {string} status
 * Status response dari backend
 */


/**
 * @typedef {Object} DepartmentRisk
 * Data risiko employee berdasarkan department
 *
 * @property {string} department
 * Nama department
 *
 * @property {number} high_risk
 * Jumlah employee dengan risiko HIGH
 *
 * @property {number} predicted_attrition
 * Jumlah employee yang diprediksi mengalami attrition
 *
 * @property {number} total_employees
 * Jumlah seluruh employee pada department
 */


/**
 * @typedef {Object} DepartmentRiskResponse
 * Response dari endpoint GET /dashboard/department-risk
 *
 * @property {DepartmentRisk[]} data
 * Data risiko berdasarkan department
 *
 * @property {string} model
 * Model machine learning yang digunakan
 *
 * @property {string} status
 * Status response dari backend
 */


/**
 * @typedef {Object} JobRoleRisk
 * Data risiko employee berdasarkan job role
 *
 * @property {number} high_risk
 * Jumlah employee dengan risiko HIGH
 *
 * @property {string} job_role
 * Nama job role
 *
 * @property {number} predicted_attrition
 * Jumlah employee yang diprediksi mengalami attrition
 *
 * @property {number} total_employees
 * Jumlah seluruh employee pada job role
 */


/**
 * @typedef {Object} JobRoleRiskResponse
 * Response dari endpoint GET /dashboard/job-role-risk
 *
 * @property {JobRoleRisk[]} data
 * Data risiko berdasarkan job role
 *
 * @property {string} model
 * Model machine learning yang digunakan
 *
 * @property {string} status
 * Status response dari backend
 */



/**
 * @typedef {Object} DashboardContextType
 *
 * State dashboard
 *
 * @property {DashboardSummary|null} summary
 * Ringkasan dashboard
 *
 * @property {RiskDistribution[]} riskDistribution
 * Distribusi risiko
 *
 * @property {DepartmentRisk[]} departmentRisk
 * Risiko berdasarkan department
 *
 * @property {JobRoleRisk[]} jobRoleRisk
 * Risiko berdasarkan job role
 *
 * Model
 *
 * @property {string} model
 * Model machine learning yang sedang digunakan
 *
 * @property {(model:string)=>void} setModel
 * Mengubah model machine learning
 *
 *
 * Loading
 *
 * @property {boolean} loading
 * Menunjukkan apakah data dashboard sedang dimuat
 *
 *
 * Data loader
 *
 * @property {()=>Promise<void>} fetchDashboard
 * Mengambil seluruh data dashboard berdasarkan model aktif
 *
 *
 * Refresh
 *
 * @property {()=>Promise<void>} refreshDashboard
 * Memuat ulang seluruh data dashboard
 */

export {};