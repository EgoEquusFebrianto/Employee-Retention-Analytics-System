from typing import Any

from sqlalchemy import select, func

from app.dto.response.dashboard_summary_api import SummaryData, SummaryApi
from app.dto.response.department_analysis_api import AttritionDepartment, AttritionDepartmentData
from app.dto.response.job_role_analysis_api import JobRoleRisk, JobRoleRiskData
from app.dto.response.risk_distribution_api import RiskDistribution, RiskDistributionData
from app.extention import db
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services import VALID_MODELS

class DashboardService:
    def get_summary(self, model: str) -> dict[str, Any]:
        if model not in VALID_MODELS:
            raise ValueError(f"Model not valid: {model}")

        statement = select(
            func.count(EmployeePrediction.id).label("total_employees"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.prediction == "Yes"
            ).label("predicted_attrition"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.prediction == "No"
            ).label("predicted_retention"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.risk_level == "HIGH"
            ).label("high_risk"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.risk_level == "MEDIUM"
            ).label("medium_risk"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.risk_level == "LOW"
            ).label("low_risk"),
        ).where(
            EmployeePrediction.model == model
        )

        result = db.session.execute(statement).one()

        summary_data = SummaryData(
            total_employees=result.total_employees,
            predicted_attrition=result.predicted_attrition,
            predicted_retention=result.predicted_retention,
            high_risk=result.high_risk,
            medium_risk=result.medium_risk,
            low_risk=result.low_risk
        ).to_dict()

        summary_api = SummaryApi(
            model=model,
            summary=summary_data
        ).to_dict()

        return summary_api

    def get_risk_distribution(self, model:str) -> dict[str, Any]:
        if model not in VALID_MODELS:
            raise ValueError(f"Model not valid: {model}")

        statement = select(
            EmployeePrediction.risk_level,
            func.count(EmployeePrediction.id).label("total")
        ).where(
            EmployeePrediction.model == model
        ).group_by(
            EmployeePrediction.risk_level
        ).order_by(
            EmployeePrediction.risk_level.asc()
        )

        rows = db.session.execute(statement).all()
        data: list[dict[str, Any]] = [
            RiskDistributionData(
                risk_level=row.risk_level,
                total=row.total
            ).to_dict()
            for row in rows
        ]


        return RiskDistribution(model=model, data=data).to_dict()

    def get_department_analysis(self, model: str) -> dict[str, Any]:
        if model not in VALID_MODELS:
            raise ValueError(f"Model Invalid: {model}")

        statement = select(
            Employee.department.label("department"),
            func.count(EmployeePrediction.id).label("total_employees"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.prediction == "Yes"
            ).label("predicted_attrition"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.risk_level == "HIGH"
            ).label("high_risk"),
        ).join(
            EmployeePrediction,
            Employee.employee_number == EmployeePrediction.employee_number
        ).where(
            EmployeePrediction.model == model
        ).group_by(
            Employee.department
        ).order_by(
            func.count(EmployeePrediction.id).desc()
        )

        rows = db.session.execute(statement).all()

        data: list[dict[str, Any]] = [
            AttritionDepartmentData(
                department=row.department,
                total_employees=row.total_employees,
                predicted_attrition=row.predicted_attrition,
                high_risk=row.high_risk,
            ).to_dict()
            for row in rows
        ]

        return AttritionDepartment(data=data, model=model).to_dict()

    def get_job_role_risk(self, model: str):
        if model not in VALID_MODELS:
            raise ValueError(f"Model Invalid: {model}")

        statement = select(
            Employee.job_role.label("job_role"),
            func.count(EmployeePrediction.id).label("total_employees"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.prediction == "Yes"
            ).label("predicted_attrition"),
            func.count(EmployeePrediction.id).filter(
                EmployeePrediction.risk_level == "HIGH"
            ).label("high_risk"),
        ).join(
            EmployeePrediction,
            Employee.employee_number == EmployeePrediction.employee_number
        ).where(
            EmployeePrediction.model == model
        ).group_by(
            Employee.job_role
        ).order_by(
            func.count(EmployeePrediction.id).desc()
        )

        rows = db.session.execute(statement).all()

        data: list[dict[str, Any]] = [
            JobRoleRiskData(
                job_role=row.job_role,
                high_risk=row.high_risk,
                total_employees=row.total_employees,
                predicted_attrition=row.predicted_attrition,
            ).to_dict()
            for row in rows
        ]

        return JobRoleRisk(model=model, data=data).to_dict()