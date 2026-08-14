from flask import jsonify, request, Response, make_response
from werkzeug.datastructures import FileStorage

from app.services.employee_service import EmployeeService
from app.services.employee_import_service import EmployeeImportService

class EmployeeController:
    def __init__(
            self,
            employee_service: EmployeeService,
            employee_import_service: EmployeeImportService
    ):
        self.employee_service = employee_service
        self.import_service = employee_import_service

    def get_employee_predictions(self) -> Response:
        page_parameter: int = request.args.get("page", default=1, type=int)
        model: str | None = request.args.get("model")

        try:
            page: int = int(page_parameter) if page_parameter else 1

        except ValueError:
            return make_response( jsonify({
                "status": "error",
                "message": "page must be integer."
            }), 400)

        if page < 1:
            page = 1

        result = self.employee_service.get_employee_predictions(
            page,
            model
        )

        return make_response(jsonify(result), 200)

    def get_high_risk_employees(self) -> Response:
        page_parameter: int = request.args.get("page", default=1, type=int)
        model: str | None = request.args.get("model")

        if model is None:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "Parameter model is needed.",
            }), 400)

        if page_parameter < 1:
            page_parameter = 1

        try:
            result = self.employee_service.get_high_risk_employees(page=page_parameter, model=model)
        except ValueError as err:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(err)
            }), 400)

        return make_response(jsonify({
            "status": "SUCCESS",
            **result
        }), 200)

    def import_employees(self) -> Response:
        if "file" not in request.files:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "File not found."
            }), 400)

        file: FileStorage = request.files["file"]

        if file.filename is None or file.filename == "":
            return make_response(jsonify({
                "status": "ERROR",
                "message": "No file selected."
            }), 400)

        try:
            result = self.import_service.import_employee(
                file_bytes=file.stream.read(),
                filename=file.filename
            )

            return make_response(jsonify({
                "status": "SUCCESS",
                "message": "Method import employee complated",
                "data": result
            }), 201)
        except ValueError as err:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(err)
            }), 400)
        except Exception:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "An error occurred when processing the file."
            }), 500)