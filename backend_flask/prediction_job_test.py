from typing import TypedDict

from app import create_app, db
from app._typed.response.prediction_response import PredictTask
from app.models.employee_model import Employee
from utils.prediction_job import PredictionJob
from app.services.prediction_service import PredictionService


class PredictionResult(TypedDict):
    employee_number: int
    model: str
    prediction: str
    probability: float
    risk_level: str

class FakePredictionService:

    def predict_batch(
        self,
        tasks: list[PredictTask],
    ) -> list[PredictionResult]:

        results: list[PredictionResult] = []
        for task in tasks:
            employee: Employee = task["employee"]

            for model_name in task["models"]:
                results.append(
                    {
                        "employee_number": employee.employee_number,
                        "model": model_name,
                        "prediction": "Yes",
                        "probability": 0.75,
                        "risk_level": "HIGH",
                    }
                )

        return results

app = create_app()

with app.app_context():
    db.create_all()

    prediction_service: PredictionService = (
        PredictionService()
    )

    prediction_job: PredictionJob = (
        PredictionJob(
            prediction_service
        )
    )

    inserted_count: int = (
        prediction_job.run()
    )

    print(
        f"Prediction berhasil disimpan: "
        f"{inserted_count}"
    )

    # job = PredictionJob(
    #     prediction_service=FakePredictionService()
    # )
    #
    # employees: list[Employee] = job.get_all_employees()
    #
    # print(
    #     f"Jumlah employee       : {len(employees)}"
    # )
    #
    # existing_predictions: list[EmployeePrediction] = (
    #     job.get_existing_predictions(employees)
    # )
    #
    # print(
    #     f"Jumlah prediction      : "
    #     f"{len(existing_predictions)}"
    # )
    #
    # employees_to_predict: list[Employee] = (
    #     job.get_employees_requiring_prediction(
    #         employees,
    #         existing_predictions,
    #     )
    # )
    #
    # print(
    #     f"Employee perlu predict : "
    #     f"{len(employees_to_predict)}"
    # )
    #
    #
    # results: list[PredictionResult] = (
    #     job.service.predict_batch(
    #         employees_to_predict
    #     )
    # )
    #
    # print(
    #     f"Hasil prediction       : "
    #     f"{len(results)}"
    # )