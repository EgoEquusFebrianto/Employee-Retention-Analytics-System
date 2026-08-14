from app.models.employee_model import Employee
from app.services.service_utilities import REQUIRED_COLUMNS

def create_employee(record: dict[str, object]) -> Employee:
    return Employee(
        **{
            column: record[column]
            for column in REQUIRED_COLUMNS
        }
    )