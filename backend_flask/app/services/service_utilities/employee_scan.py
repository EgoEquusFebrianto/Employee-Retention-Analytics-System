from sqlalchemy import select
from app.models.employee_model import Employee
from app.extention import db
import pandas as pd

def find_existing_employee(employee_numbers: list[int]):
    if not employee_numbers: return set()

    statement = select(
        Employee.employee_number
    ).where(
        Employee.employee_number.in_(employee_numbers)
    )

    existing_numbers = db.session.scalars(statement).all()

    return existing_numbers

def split_new_employees(df: pd.DataFrame):
    employee_numbers: list[int] = df["employee_number"].astype(int).tolist()
    existing_numbers: set[int] = find_existing_employee(employee_numbers)

    new_df = df[
        ~df["employee_number"].isin(existing_numbers)
    ].copy()

    return new_df, existing_numbers