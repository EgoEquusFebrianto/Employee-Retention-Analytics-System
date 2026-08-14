from flask import Blueprint
from app.controllers.employee_controller import EmployeeController
from app.services.employee_service import EmployeeService
from app.services.prediction_service import PredictionService
from app.services.employee_import_service import EmployeeImportService

from flask import jsonify, request
from werkzeug.datastructures import FileStorage

def test_upload():

    print("request.files:")
    print(request.files)

    print("request.form:")
    print(request.form)

    print("content-type:")
    print(request.content_type)

    file = request.files.get("file")

    if file is None:
        return jsonify({
            "status": "error",
            "message": "File tidak ditemukan.",
            "content_type": request.content_type,
            "files": list(request.files.keys()),
            "form": list(request.form.keys()),
        }), 400

    content: bytes = file.stream.read()

    return jsonify({
        "status": "success",
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(content),
    })

employee_bp = Blueprint(
    "employee",
    __name__,
    url_prefix="/api/employees"
)

employee_service = EmployeeService()

prediction_service = PredictionService()
employee_import_service = EmployeeImportService(prediction_service)

employee_controller: EmployeeController = EmployeeController(employee_service, employee_import_service)

@employee_bp.get("/predictions")
def get_employee_predictions():
    return employee_controller.get_employee_predictions()

@employee_bp.get("/high-risk")
def get_high_risk_employees():
    return employee_controller.get_high_risk_employees()

@employee_bp.post("/import")
def import_employees():
    return employee_controller.import_employees()

@employee_bp.post("/test-upload")
def test_upload_route():
    return test_upload()