/**
 * @typedef {Object} EmployeePrediction
 * Hasil prediksi satu model untuk seorang employee.
 *
 * @property {string} model
 * Nama model machine learning.
 *
 * @property {string} prediction
 * Hasil prediksi, misalnya "Yes" atau "No".
 *
 * @property {string} prediction_at
 * Waktu ketika prediksi dibuat.
 *
 * @property {number} probability
 * Probabilitas prediksi.
 *
 * @property {string} risk_level
 * Tingkat risiko: HIGH, MEDIUM, atau LOW.
 */


/**
 * @typedef {Object} EmployeePredictionItem
 * Data ringkas employee yang digunakan pada tabel employee.
 *
 * @property {number} employee_number
 * Nomor identitas employee.
 *
 * @property {number} age
 * Usia employee.
 *
 * @property {string} department
 * Department employee.
 *
 * @property {string} job_role
 * Posisi atau job role employee.
 *
 * @property {string} model
 * Model machine learning yang digunakan.
 *
 * @property {string} prediction
 * Hasil prediksi attrition.
 *
 * @property {string} prediction_at
 * Waktu ketika prediksi dibuat.
 *
 * @property {number} probability
 * Probabilitas prediksi attrition.
 *
 * @property {string} risk_level
 * Tingkat risiko employee.
 */


/**
 * @typedef {Object} EmployeePredictionPagination
 * Informasi pagination employee prediction.
 *
 * @property {boolean} has_next
 * Menunjukkan apakah masih terdapat halaman berikutnya.
 *
 * @property {boolean} has_previous
 * Menunjukkan apakah terdapat halaman sebelumnya.
 *
 * @property {number} page
 * Nomor halaman saat ini.
 *
 * @property {number} per_page
 * Jumlah data pada setiap halaman.
 *
 * @property {number} total
 * Jumlah seluruh data.
 *
 * @property {number} total_pages
 * Jumlah seluruh halaman.
 */


/**
 * @typedef {Object} EmployeePredictionListResponse
 * Response dari endpoint employee predictions.
 *
 * GET /employees/predictions
 * GET /employees/predictions?model=xgboost
 *
 * @property {EmployeePredictionItem[]} data
 * Daftar employee prediction.
 *
 * @property {EmployeePredictionPagination} pagination
 * Informasi pagination.
 */


/**
 * @typedef {Object} HighRiskEmployee
 * Data ringkas employee dengan tingkat risiko HIGH.
 *
 * @property {number} employee_number
 * Nomor identitas employee.
 *
 * @property {number} age
 * Usia employee.
 *
 * @property {string} department
 * Department employee.
 *
 * @property {string} job_role
 * Posisi atau job role employee.
 *
 * @property {string} prediction
 * Hasil prediksi attrition.
 *
 * @property {number} probability
 * Probabilitas prediksi attrition.
 *
 * @property {string} risk_level
 * Tingkat risiko employee.
 */


/**
 * @typedef {Object} HighRiskEmployeeResponse
 * Response dari endpoint high-risk employee.
 *
 * GET /employees/high-risk?model=xgboost
 *
 * @property {HighRiskEmployee[]} data
 * Daftar employee dengan risiko tinggi.
 *
 * @property {string} model
 * Model machine learning yang digunakan.
 *
 * @property {EmployeePredictionPagination} pagination
 * Informasi pagination.
 *
 * @property {string} status
 * Status response dari backend.
 */


/**
 * @typedef {Object} EmployeeData
 * Informasi lengkap seorang employee.
 *
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
 * @typedef {Object} EmployeePredictionDetailData
 * Data detail employee beserta seluruh hasil prediksi model.
 *
 * @property {EmployeeData} employee
 * Informasi lengkap employee.
 *
 * @property {EmployeePrediction[]} predictions
 * Hasil prediksi dari seluruh model.
 */


/**
 * @typedef {Object} EmployeePredictionDetailResponse
 * Response dari endpoint employee detail.
 *
 * GET /employees/predictions/:employeeNumber
 *
 * @property {EmployeePredictionDetailData} data
 * Detail employee dan hasil prediksinya.
 *
 * @property {string} status
 * Status response dari backend.
 */


/**
 * @typedef {Object} EmployeeContextType
 *
 * State model
 *
 * @property {string} model
 * Model machine learning yang sedang dipilih.
 *
 * @property {(model:string)=>void} setModel
 *
 *
 * Employee list
 *
 * @property {EmployeePredictionItem[]} employees
 * Daftar employee yang ditampilkan.
 *
 * @property {boolean} loading
 * Status loading employee data.
 *
 *
 * View
 *
 * @property {string} view
 * Tampilan employee: "all" atau "high-risk".
 *
 * @property {(view:string)=>void} setView
 *
 *
 * Pagination
 *
 * @property {number} page
 * Halaman employee saat ini.
 *
 * @property {EmployeePredictionPagination|null} pagination
 * Informasi pagination employee.
 *
 * @property {(page:number)=>void} setPage
 *
 *
 * Employee loader
 *
 * @property {()=>Promise<void>} fetchEmployees
 * Mengambil data employee berdasarkan view, model, dan halaman aktif.
 */


/**
 * @typedef {"all"|"high-risk"} EmployeeView
 */


export {};