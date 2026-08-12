from sqlalchemy import select

from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services.prediction_service import PredictionService
from app import db

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

    def get_existing_prediction(self, employees: list[Employee]) -> list[EmployeePrediction]:
        if not employees: return []

        employee_numbers: list[int] = [
            employee.employee_number
            for employee in employees
        ]

        statement = select(EmployeePrediction).where(
            EmployeePrediction.employee_number.in_(employee_numbers)
        )

