from flask import Blueprint

from app.controllers.employee_dasboard_controller import DashboardController
from app.services.employee_dashboard_service import DashboardService

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard"
)

dashboard_service = DashboardService()
dashboard_controller = DashboardController(dashboard_service)

@dashboard_bp.get("/summary")
def get_summary():
    return dashboard_controller.get_summary()

@dashboard_bp.get("/risk-distribution")
def get_risk_distribution():
    return dashboard_controller.get_risk_distribution()

@dashboard_bp.get("/department-risk")
def get_department_analysis():
    return dashboard_controller.get_department_analysis()

@dashboard_bp.get("/job-role-risk")
def get_job_role_risk():
    return dashboard_controller.get_job_role_risk()