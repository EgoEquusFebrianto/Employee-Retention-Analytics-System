import re

import pandas as pd
from sqlalchemy import inspect, text

from utils.database import engine

def to_snake_case(column_name: str) -> str:
    """
    Mengubah nama kolom CamelCase menjadi snake_case.

    Contoh:
        DistanceFromHome -> distance_from_home
        MonthlyIncome    -> monthly_income
        EmployeeNumber   -> employee_number
    """
    return re.sub(
        r"(?<!^)(?=[A-Z])",
        "_",
        column_name
    ).lower()

def load_csv_to_postgresql(
        csv_path: str,
        table_name: str
):
    inspector = inspect(engine)

    table_exists = inspector.has_table(table_name)
    if table_exists:
        with engine.connect() as connection:
            result = connection.execute(
                text(f'SELECT COUNT(*) from "{table_name}"')
            )

            row_count = result.scalar()

        if row_count > 0:
            print(
                f"Tabel '{table_name}' sudah memiliki "
                f"{row_count} data. Import dilewati."
            )

            return {
                "status": "skipped",
                "table": table_name,
                "rows": row_count
            }

        print(
            f"Tabel '{table_name}' sudah ada tetapi kosong. "
            "Import akan dilakukan."
        )

    else:
        print(
            f"Tabel '{table_name}' belum ada. "
            "Tabel akan dibuat otomatis."
        )

    df = pd.read_csv(csv_path)

    df.columns = [to_snake_case(column) for column in df.columns]

    df.to_sql(
        table_name,
        con=engine,
        if_exists="append",
        index=False
    )

    return {
        "table": table_name,
        "rows": len(df),
        "columns": list(df.columns)
    }