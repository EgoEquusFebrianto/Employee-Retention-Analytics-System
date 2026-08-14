from typing import Any

from sqlalchemy import select, func

from app.dto.response.employee_risk_page import EmployeeHighRiskData, EmployeeHighRiskPage, EmployeeHighRisk
from app.extention import db
from app.dto.response.employee_page import Data, PaginationInfo, EmployeePage
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services import VALID_MODELS


class EmployeeService:
    def get_employee_predictions(
            self,
            page: int,
            model: str | None
    ) -> dict[str, Any]:
        statement = select(
            Employee,
            EmployeePrediction
        ).join(
            EmployeePrediction,
            Employee.employee_number == EmployeePrediction.employee_number
        )

        count_statement = select(
            func.count(EmployeePrediction.id)
        )

        if model:
            statement = statement.where(
                EmployeePrediction.model == model
            )

            count_statement = count_statement.where(
                EmployeePrediction.model == model
            )

        total: int = db.session.scalar(count_statement) or 0
        offset: int = (page - 1) * 100

        statement = statement \
            .order_by(Employee.employee_number.asc()) \
            .offset(offset) \
            .limit(100)

        rows = db.session.execute(statement).all()
        data: list[dict[str, Any]] = []

        for employee, prediction in rows:
            employee: Employee
            prediction: EmployeePrediction

            data_employee = Data(
                employee_number=employee.employee_number,
                age=employee.age,
                department=employee.department,
                job_role=employee.job_role,
                model=prediction.model,
                prediction=prediction.prediction,
                probability=prediction.probability,
                risk_level=prediction.risk_level,
                prediction_at=prediction.prediction_at
            )

            data.append(data_employee.to_dict())

        total_pages: int = (total + 100 - 1) // 100 if total > 0 else 0

        pagination_info = PaginationInfo(
            page=page,
            per_page=100,
            total=total,
            total_pages=total_pages,
            has_next=(page < total_pages),
            has_previous=(page > 1)
        ).to_dict()

        return EmployeePage(data=data, pagination=pagination_info).to_dict()

    def get_high_risk_employees(self, page: int, model: str) -> dict[str, Any]:

        if model not in VALID_MODELS:
            raise ValueError(f"INVALID MODEL: {model}.")

        offset: int = (page - 1) * 100

        statement = select(
            Employee,
            EmployeePrediction,
        ).join(
            EmployeePrediction,
            Employee.employee_number == EmployeePrediction.employee_number
        ).where(
            EmployeePrediction.model == model,
            EmployeePrediction.risk_level == "HIGH",
        ).offset(
            offset
        ).limit(100)

        count_statement = select(
            func.count(EmployeePrediction.id)
        ).where(
            EmployeePrediction.model == model,
            EmployeePrediction.risk_level == "HIGH",
        )

        total: int = db.session.scalar(count_statement) or 0

        rows = db.session.execute(statement).all()
        total_pages: int = (total + 100 - 1) // 100 if total > 0 else 0

        data: list[dict[str, Any]] = [
            EmployeeHighRiskData(
                employee_number=employee.employee_number,
                age=employee.age,
                department=employee.department,
                job_role=employee.job_role,
                prediction=prediction.prediction,
                probability=prediction.probability,
                risk_level=prediction.risk_level,
            ).to_dict()
            for employee, prediction in rows
        ]

        pagination: dict[str, Any] = EmployeeHighRiskPage(
            total=total,
            per_page=100,
            total_pages=total_pages,
            page=page,
            has_next=(page < total_pages),
            has_previous=(page > 1)
        ).to_dict()

        return EmployeeHighRisk(model=model, data=data, pagination=pagination).to_dict()