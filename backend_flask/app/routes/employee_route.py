from flask import Blueprint
from app.controllers.employee_controller import EmployeeController
from app.services.employee_service import EmployeeService

employee_bp = Blueprint(
    "employee",
    __name__,
    url_prefix="/api/employees"
)

employee_service: EmployeeService = EmployeeService()
employee_controller: EmployeeController = EmployeeController(employee_service)

@employee_bp.get("/predictions")
def get_employee_predictions():
    return employee_controller.get_employee_predictions()