from app.dto.response.add_employee_response import ImportEmployeeResponse
from app.models.employee_model import Employee
from app.extention import db
import pandas as pd

from app.services.prediction_service import PredictionService
from app.services.service_utilities.employee_scan import split_new_employees
from app.services.service_utilities.helper import create_employee
from app.services.service_utilities.preparation_mechanism import prepare_data

class EmployeeImportService:
    def __init__(self, prediction_service: PredictionService):
        self.service = prediction_service

    @staticmethod
    def insert_employees(df: pd.DataFrame):
        if df.empty: return []

        employee_records: list[Employee] = []

        for record in df.to_dict(orient="records"):
            employee: Employee = create_employee(record)

            employee_records.append(employee)

        db.session.add_all(employee_records)
        db.session.flush()

        employee_numbers: list[int] = [
            employee.employee_number
            for employee in employee_records
        ]

        return employee_numbers

    def import_employee(self, file_bytes: bytes, filename: str) -> dict[str, object]:
        try:
            df: pd.DataFrame = prepare_data(file_bytes=file_bytes, filename=filename)

            new_dataframe, existing_number = split_new_employees(df)
            employee_numbers: list[int] = self.insert_employees(new_dataframe)

            models = [
                "logistic_regression",
                "random_forest",
                "xgboost",
            ]

            prediction_results = self.service.predict_batch(employee_numbers, models)

            self.service.save_predictions(prediction_results)

            res = ImportEmployeeResponse(
                inserted=len(employee_numbers),
                skipped=len(existing_number),
                duplicate_employee_numbers=sorted(existing_number),
                employee_numbers=employee_numbers

            ).to_dict()

            return res
        except Exception as err:
            db.session.rollback()
            raise