from app import create_app, db
from utils.csv_loader import load_csv_to_postgresql
from app.models.employee_model import Employee

app = create_app()

with app.app_context():
    db.create_all()

    _db = load_csv_to_postgresql(
        csv_path="dataset/Test.csv",
        table_name="employee"
    )

    print("\nImport result:")
    print(_db)