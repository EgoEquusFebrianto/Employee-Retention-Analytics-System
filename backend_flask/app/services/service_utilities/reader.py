from io import BytesIO
from app.services.service_utilities import ALLOWED_EXTENSIONS
import pandas as pd
import re

def to_snake_case(column_name: str) -> str:
    return re.sub(
        r"(?<!^)(?=[A-Z])",
        "_",
        column_name
    ).lower()

def read_file(file_bytes: bytes, filename: str):
    extension: str = "." + filename.rsplit(".", 1)[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        return ValueError("Format File Invalid. [Allowed format are CSV, XLS, or XLSX]")

    file_stream = BytesIO(file_bytes)

    if extension == ".csv":
        df = pd.read_csv(file_stream)
    elif extension == ".xls":
        df = pd.read_excel(file_stream, engine="xlrd")
    else:
        df = pd.read_excel(file_stream, engine="openpyxl")

    df.columns = [to_snake_case(column) for column in df.columns]

    return df