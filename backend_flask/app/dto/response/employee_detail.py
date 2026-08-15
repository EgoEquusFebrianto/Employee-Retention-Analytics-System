from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List, Any

@dataclass
class PredictionDetailData:
    model: str
    prediction: str
    probability: float
    risk_level: str
    prediction_at: datetime

    def to_dict(self):
        return asdict(self)

@dataclass
class EmployeeDetailData:
    employee_number: int
    age: int
    business_travel: str
    daily_rate: int
    department: str
    distance_from_home: int
    education: int
    education_field: str
    employee_count: int
    environment_satisfaction: int
    gender: str
    hourly_rate: int
    job_involvement: int
    job_level: int
    job_role: str
    job_satisfaction: int
    marital_status: str
    monthly_income: int
    monthly_rate: int
    num_companies_worked: int
    over18: str
    over_time: str
    percent_salary_hike: int
    performance_rating: int
    relationship_satisfaction: int
    standard_hours: int
    stock_option_level: int
    total_working_years: int
    training_times_last_year: int
    work_life_balance: int
    years_at_company: int
    years_in_current_role: int
    years_since_last_promotion: int
    years_with_curr_manager: int

    def to_dict(self):
        return asdict(self)

@dataclass
class EmployeeDetail:
    employee: dict[str, Any]
    predictions: List[dict[str, Any]]

    def to_dict(self):
        return asdict(self)