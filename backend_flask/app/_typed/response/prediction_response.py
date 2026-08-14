from typing import TypedDict
from app.models.employee_model import Employee

class PredictTask(TypedDict):
    employee: Employee
    models: list[str]

class PredictionResponse(TypedDict):
    employee_number: int
    model: str
    prediction: str
    probability: float
    risk_level: str