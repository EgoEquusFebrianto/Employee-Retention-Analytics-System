from flask import jsonify, request, Response, make_response

from app.services.employee_service import EmployeeService

class EmployeeController:
    def __init__(self, employee_service: EmployeeService):
        self.service = employee_service

    def get_employee_predictions(self) -> Response:
        page_parameter: str | None = request.args.get("page")
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

        result = self.service.get_employee_predictions(
            page,
            model
        )

        return make_response(jsonify(result), 200)