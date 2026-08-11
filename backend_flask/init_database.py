from app import create_app
from utils.csv_loader import load_csv_to_postgresql

app = create_app()

with app.app_context():
    _db = load_csv_to_postgresql(
        csv_path="dataset/Test.csv",
        table_name="employee"
    )

    print("\nImport result:")
    print(_db)