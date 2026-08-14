from collections import defaultdict

import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from pathlib import Path

from sqlalchemy import select

from app._typed.response.prediction_response import PredictionResponse, PredictTask
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services import *
from app.extention import db

class PredictionService:
    def __init__(self):
        self.models: dict[str, Pipeline] = {
            model_name: joblib.load(model_path)
            for model_name, model_path
            in MODEL_PATHS.items()
        }

    @classmethod
    def employee_to_dataframe(
            cls,
            employees: list[Employee]
    ):

        return pd.DataFrame([
            {
                feature: getattr(employee, feature)
                for feature in FEATURES
            }
            for employee in employees
        ])

    @staticmethod
    def determine_risk_level(probability: float) -> str:
        if probability >= 0.70: return "HIGH"
        elif probability >= 0.40: return "MEDIUM"
        return "LOW"

    def _predict_batch(
            self,
            model_name: str,
            employees: list[Employee],
    ) -> list[PredictionResponse]:
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

    def predict_batch_for_seeder(self, tasks: list[PredictTask]) -> list[PredictionResponse]:
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
            model_result: list[PredictionResponse] = self._predict_batch(
                model_name,
                employees
            )

            results.extend(model_result)

        return results

    def predict_batch(self, employee_numbers: list[int], models: list[str]):
        if not employee_numbers: return []

        if not models:
            raise ValueError("At least there is one model input.")

        invalid_models: set[str] = set(models) - VALID_MODELS

        if invalid_models:
            raise ValueError("Invalid Model ", sorted(invalid_models))

        employees: list[Employee] = self._get_employees(employee_numbers)

        if not employees: return []

        prediction_result: list[PredictionResponse] = []

        for model_name in models:
            predictions: list[PredictionResponse] = self._predict_batch(model_name, employees)

            prediction_result.extend(predictions)

        return prediction_result

    def _get_employees(self, employee_numbers: list[int]) -> list[Employee]:
        statement = select(Employee).where(
            Employee.employee_number.in_(employee_numbers)
        )

        res = db.session.scalars(statement).all()

        return res

    def save_predictions(self, results: list[PredictionResponse]):
        if not results: return 0

        predictions: list[EmployeePrediction] = [
            EmployeePrediction(
                employee_number=result["employee_number"],
                model=result["model"],
                prediction=result["prediction"],
                probability=result["probability"],
                risk_level=result["risk_level"],
            )
            for result in results
        ]

        db.session.add_all(predictions)
        db.session.commit()