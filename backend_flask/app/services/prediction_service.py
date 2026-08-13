from collections import defaultdict
from typing import Any

import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from pathlib import Path

from app._typed.response.prediction_response import PredictionResponse, PredictTask
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction

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
        return "LOW"

    def _predict_model(
            self,
            model_name: str,
            employees: list[Employee]
    ) -> list[EmployeePrediction]:
        if not employees: return []

        model: Pipeline = self.models[model_name]
        df = self.employee_to_dataframe(employees)

        predictions =  model.predict(df)
        probabilities = model.predict_proba(df)

        yes_index: int = list(model.classes_).index(1)

        results: list[PredictionResponse] = []

        for index, employee in enumerate(employees):
            prediction_value: int = int(predictions[index])
            probability: float = float(probabilities[index][yes_index])
            prediction: str = "Yes" if prediction_value == 1 else "No"
            risk_level: str = self.determine_risk_level(probability)

            result: PredictionResponse = {
                "employee_number": employee.employee_number,
                "model": model_name,
                "prediction": prediction,
                "probability": probability,
                "risk_level": risk_level
            }

            results.append(result)

        return results

    def predict_batch(self, tasks: list[PredictTask]) -> list[PredictionResponse]:
        if not tasks: return []

        tasks_by_model: dict[str, list[Employee]] = defaultdict(list)

        for task in tasks:
            employee: Employee = task["employee"]
            models: list[str] = task["models"]

            for model_name in models:
                if model_name not in self.models:
                    raise ValueError(f"Model tidak dikenal: {model_name}")

                tasks_by_model[model_name].append(employee)

        results: list[PredictionResponse] = []

        for model_name, employees in tasks_by_model.items():
            model_result: list[PredictionResponse] = self._predict_model(
                model_name,
                employees
            )

            results.extend(model_result)

        return results