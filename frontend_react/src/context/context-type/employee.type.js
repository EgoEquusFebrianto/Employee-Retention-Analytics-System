/**
 * @typedef {Object} EmployeePrediction
 *
 * Data employee beserta hasil prediksi model.
 *
 * @property {number} age
 * @property {string} department
 * @property {number} employee_number
 * @property {string} job_role
 * @property {string} model
 * @property {string} prediction
 * @property {string} prediction_at
 * @property {number} probability
 * @property {string} risk_level
 */


/**
 * @typedef {Object} EmployeePredictionPagination
 *
 * Informasi paginasi employee prediction.
 *
 * @property {boolean} has_next
 * @property {boolean} has_previous
 * @property {number} page
 * @property {number} per_page
 * @property {number} total
 * @property {number} total_pages
 */


/**
 * @typedef {Object} EmployeePredictionResponse
 *
 * Response from:
 * GET /employees/predictions
 *
 * @property {EmployeePrediction[]} data
 * @property {EmployeePredictionPagination} pagination
 */



/**
 * @typedef {Object} EmployeeData
 * @property {number} age
 * @property {string} business_travel
 * @property {number} daily_rate
 * @property {string} department
 * @property {number} distance_from_home
 * @property {number} education
 * @property {string} education_field
 * @property {number} employee_count
 * @property {number} employee_number
 * @property {number} environment_satisfaction
 * @property {string} gender
 * @property {number} hourly_rate
 * @property {number} job_involvement
 * @property {number} job_level
 * @property {string} job_role
 * @property {number} job_satisfaction
 * @property {string} marital_status
 * @property {number} monthly_income
 * @property {number} monthly_rate
 * @property {number} num_companies_worked
 * @property {string} over18
 * @property {string} over_time
 * @property {number} percent_salary_hike
 * @property {number} performance_rating
 * @property {number} relationship_satisfaction
 * @property {number} standard_hours
 * @property {number} stock_option_level
 * @property {number} total_working_years
 * @property {number} training_times_last_year
 * @property {number} work_life_balance
 * @property {number} years_at_company
 * @property {number} years_in_current_role
 * @property {number} years_since_last_promotion
 * @property {number} years_with_curr_manager
 */

/**
 * @typedef {Object} PredictionData
 * @property {string} model
 * @property {string} prediction
 * @property {string} prediction_at
 * @property {number} probability
 * @property {string} risk_level
 */

/**
 * @typedef {Object} EmployeePredictionDetailData
 *
 * @property {EmployeeData} employee
 * @property {PredictionData[]} predictions
 */


/**
 * @typedef {Object} EmployeePredictionDetailResponse
 *
  
 * Response from:
 * GET /employees/{id}
 * 
 * @property {EmployeePredictionDetailData} data
 * @property {string} status
 */




/**
 * @typedef {Object} EmployeeContextType
 *
 * Data employee.
 *
 * @property {EmployeePrediction[]} employees
 * @property {EmployeeData|null} employeeDetail
 *
 * Filter.
 *
 * @property {string|null} model
 * @property {(model:string|null)=>void} setModel
 *
 * Pagination.
 *
 * @property {number} page
 * @property {(page:number)=>void} setPage
 * @property {number} perPage
 * @property {number} total
 * @property {number} totalPages
 * @property {boolean} hasNext
 * @property {boolean} hasPrevious
 *
 * Loading state.
 *
 * @property {boolean} loading
 *
 * Actions.
 *
 * @property {(page?:number)=>Promise<void>} fetchEmployees
 * @property {(employeeNumber:number)=>Promise<void>} fetchEmployeeDetail
 */

export {};