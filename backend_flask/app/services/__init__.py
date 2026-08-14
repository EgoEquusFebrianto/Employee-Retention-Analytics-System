VALID_MODELS: set[str] = {
    "logistic_regression",
    "random_forest",
    "xgboost"
}

FEATURES: list[str] = [
    "age",
    "daily_rate",
    "hourly_rate",
    "monthly_rate",
    "business_travel",
    "department",
    "distance_from_home",
    "education",
    "education_field",
    "environment_satisfaction",
    "job_involvement",
    "job_level",
    "job_role",
    "job_satisfaction",
    "monthly_income",
    "num_companies_worked",
    "over_time",
    "percent_salary_hike",
    "performance_rating",
    "relationship_satisfaction",
    "stock_option_level",
    "total_working_years",
    "training_times_last_year",
    "work_life_balance",
    "years_at_company",
    "years_in_current_role",
    "years_since_last_promotion",
    "years_with_curr_manager"
]

MODEL_PATHS: dict[str, str] = {
    "logistic_regression": "models/logistic_regression_pipeline.pkl",
    "random_forest": "models/random_forest_pipeline.pkl",
    "xgboost": "models/xgboost_pipeline.pkl"
}