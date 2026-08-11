from app import create_app
from utils.csv_loader import load_csv_to_postgresql

app = create_app()

if __name__ == "__main__":

    _db = load_csv_to_postgresql(
        csv_path="dataset/Test.csv",
        table_name="employee"
    )

    print("\nImport result:")
    print(_db)

    # app.run(debug=True)