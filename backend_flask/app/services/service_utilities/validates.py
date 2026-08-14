import pandas as pd

from app.services.service_utilities import *

def validate_columns(df: pd.DataFrame):
    columns: set[str] = set(df.columns)
    forbidden_columns: set[str] = columns & FORBIDDEN_COLUMNS

    if forbidden_columns:
        raise ValueError(f"File can't contain column: {sorted(forbidden_columns)}")

    missing_columns: set[str] = REQUIRED_COLUMNS - columns

    if missing_columns:
        raise ValueError(f"One or More Columns were not found: {sorted(missing_columns)}")

    extra_columns: set[str] = columns - REQUIRED_COLUMNS

    if extra_columns:
        raise ValueError(f"Several unrecognized columns were found.")


def validate_data(df: pd.DataFrame):
    if df.empty:
        raise ValueError("File not have any employees data.")

    validate_columns(df)

    if df["employee_number"].isna().any():
        raise ValueError("employee_number can't be empty")

    if df["employee_number"].duplicated().any():
        duplicated_numbers: list[int] = df.loc[
            df["employee_number"].duplicated(keep=False),
            "employee_number",
        ].dropna().astype(int).unique().tolost()

        raise ValueError(f"There are several duplicate employee numbers in file: {duplicated_numbers}")
