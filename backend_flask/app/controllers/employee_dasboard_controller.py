from flask import Response, make_response, request, jsonify
from app.services.employee_dashboard_service import DashboardService

class DashboardController:
    def __init__(self, dashboard_service: DashboardService):
        self.service = dashboard_service

    def get_summary(self) -> Response:
        model: str | None = request.args.get("model")

        if model is None:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "Attribute model is needed."
            }), 400)

        try:
            result: dict = self.service.get_summary(model=model)

        except ValueError as err:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(err)
            }), 400)

        return make_response(jsonify({
            "status": "SUCCESS",
            **result
        }), 200)

    def get_risk_distribution(self) -> Response:
        model: str | None = request.args.get("model")

        if model is None:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "Parameter model is needed"
            }), 400)

        try:
            result = self.service.get_risk_distribution(model=model)
        except ValueError as err:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(err)
            }), 400)

        return make_response(jsonify({
            "status": "SUCCESS",
            **result
        }), 400)

    def get_department_analysis(self) -> Response:
        model: str | None = request.args.get("model")

        if model is None:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "Parameter model is needed."
            }), 400)

        try:
            result = self.service.get_department_analysis(model=model)
        except ValueError as err:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(err)
            }),400)

        return make_response(jsonify({
            "status": "SUCCESS",
            **result
        }), 200)

    def get_job_role_risk(self) -> Response:
        model: str | None = request.args.get("model")

        if model is None:
            return make_response(jsonify({
                "status": "ERROR",
                "message": "Parameter model is needed.",
            }), 400)

        try:
            result=  self.service.get_job_role_risk(model=model)
        except ValueError as error:
            return make_response(jsonify({
                "status": "ERROR",
                "message": str(error),
            }), 400)

        return make_response(jsonify({
            "status": "SUCCESS",
            **result,
        }), 200)