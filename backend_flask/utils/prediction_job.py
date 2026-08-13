from collections import defaultdict

from sqlalchemy import select

from app._typed.response.prediction_response import PredictionResponse, PredictTask
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services.prediction_service import PredictionService
from app.extention import db

class PredictionJob:
    REQUIRED_MODELS: set[str] = {
        "logistic_regression",
        "random_forest",
        "xgboost"
    }

    def __init__(self, prediction_service: PredictionService):
        self.service = prediction_service

    def get_all_employees(self) -> list[Employee]:
        statement = select(Employee)

        return db.session.scalars(statement).all()

    def get_existing_predictions(self, employees: list[Employee]) -> list[EmployeePrediction]:
        if not employees: return []

        employee_numbers: list[int] = [
            employee.employee_number
            for employee in employees
        ]

        statement = select(EmployeePrediction).where(
            EmployeePrediction.employee_number.in_(employee_numbers)
        )

        predictions: list[EmployeePrediction] = db.session.scalars(statement).all()

        return predictions

    def get_employees_requiring_prediction(
            self,
            employees: list[Employee],
            existing_predictions: list[EmployeePrediction]
    ) -> list[PredictTask]:
        existing_models: dict[int, set[str]] = defaultdict(set)

        for prediction in existing_predictions:
            employee_number: int = prediction.employee_number

            existing_models[employee_number].add(prediction.model)

        task: list[PredictTask] = []

        for employee in employees:
            employee_model: set[str] = existing_models.get(
                employee.employee_number,
                str()
            )

            missing_models: list[str] = [
                model
                for model in self.REQUIRED_MODELS
                if model not in employee_model
            ]

            if missing_models:
                task.append({
                    "employee": employee,
                    "models": missing_models
                })

        return task

    def save_predictions(self, results: list[PredictionResponse]) -> int:
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

        return len(predictions)

    def run(self) -> int:
        employees: list[Employee] = self.get_all_employees()

        if not employees: return 0

        existing_predictions: list[EmployeePrediction] = self.get_existing_predictions(employees)

        tasks: list[PredictTask] = (
            self.get_employees_requiring_prediction(employees, existing_predictions)
        )

        if not tasks: return 0

        results: list[PredictionResponse] = self.service.predict_batch(tasks)

        inserted_count: int = self.save_predictions(results)

        return inserted_count