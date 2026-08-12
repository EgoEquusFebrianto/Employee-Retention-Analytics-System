from typing import Any

import pandas as pd
import joblib
from sklearn.pipeline import Pipeline

from app.models.employee_model import Employee

class PredictionService:
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

    def __init__(self):
        self.models: dict[str, Pipeline] = {
            model_name: joblib.load(model_path)
            for model_name, model_path
            in self.MODEL_PATHS.items()
        }

    @classmethod
    def employee_to_dataframe(
            cls,
            employees: list[Employee]
    ):
        return pd.DataFrame([
            {
                feature: getattr(employee, feature)
                for feature in cls.FEATURES
            }
            for employee in employees
        ])

    @staticmethod
    def determine_risk_level(probability: float) -> str:
        if probability >= 0.70: return "HIGH"
        elif probability >= 0.40: return "MEDIUM"
        return "Low"

    def predict_batch(self, employees: list[Employee]) -> list[dict[str, Any]]:
        if not employees: return []

        dataframe = self.employee_to_dataframe(employees)

        result: list[dict[str, Any]] = []

        for model_name, model in self.models.items():
            predictions = model.predict(dataframe)
            probabilities = model.predict_proba(dataframe)

            yes_index: int = list(model.classes_).index(1)

            for index, employee in enumerate(employees):
                prediction: str = str(predictions[index])
                probability: float = float(probabilities[index][yes_index])
                risk_level: str = self.determine_risk_level(probability)

                result.append({
                    "employee_number": employee.employee_number,
                    "model": model_name,
                    "prediction": prediction,
                    "probability": probability,
                    "risk_level": risk_level
                })

        return result