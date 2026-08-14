import pandas as pd

from app.services.service_utilities.reader import read_file
from app.services.service_utilities.validates import validate_data

def normalize_data_types(df: pd.DataFrame):
    _df = df.copy()

    _df["employee_number"] = pd.to_numeric(
        _df["employee_number"],
        errors="coerce"
    ).astype("Int64")

    return _df

def prepare_data(file_bytes: bytes, filename: str):
    df: pd.DataFrame = read_file(file_bytes, filename)
    df = normalize_data_types(df)

    validate_data(df)

    return df