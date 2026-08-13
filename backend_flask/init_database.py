from app import create_app
from app.extention import db
from utils.prediction_job import PredictionJob
from app.services.prediction_service import PredictionService
from utils.csv_loader import load_csv_to_postgresql

from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction

app = create_app()

with app.app_context():
    db.create_all()

    _db = load_csv_to_postgresql(
        csv_path="dataset/Test.csv",
        table_name="employee"
    )

    print("\nImport result:")
    print(_db)

    prediction_service: PredictionService = PredictionService()
    prediction_job: PredictionJob = PredictionJob(prediction_service)
    inserted_count: int = prediction_job.run()

    print(f"Prediction berhasil disimpan: {inserted_count}")