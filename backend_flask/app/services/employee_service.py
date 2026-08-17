from typing import Any

from sqlalchemy import select, func

from app.dto.response.employee_detail import EmployeeDetailData, PredictionDetailData, EmployeeDetail
from app.dto.response.employee_risk_page import EmployeeHighRiskData, EmployeeHighRiskPage, EmployeeHighRisk
from app.extention import db
from app.dto.response.employee_page import Data, PaginationInfo, EmployeePage
from app.models.employee_model import Employee
from app.models.prediction_model import EmployeePrediction
from app.services import VALID_MODELS


class EmployeeService:
    def __init__(self):
        self.__perpage = 50
        
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
        offset: int = (page - 1) * self.__perpage

        statement = statement \
            .order_by(Employee.employee_number.asc()) \
            .offset(offset) \
            .limit(self.__perpage)

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

        total_pages: int = (total + self.__perpage - 1) // self.__perpage if total > 0 else 0

        pagination_info = PaginationInfo(
            page=page,
            per_page=self.__perpage,
            total=total,
            total_pages=total_pages,
            has_next=(page < total_pages),
            has_previous=(page > 1)
        ).to_dict()

        return EmployeePage(data=data, pagination=pagination_info).to_dict()

    def get_high_risk_employees(self, page: int, model: str) -> dict[str, Any]:

        if model not in VALID_MODELS:
            raise ValueError(f"INVALID MODEL: {model}.")

        offset: int = (page - 1) * self.__perpage

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
        ).limit(self.__perpage)

        count_statement = select(
            func.count(EmployeePrediction.id)
        ).where(
            EmployeePrediction.model == model,
            EmployeePrediction.risk_level == "HIGH",
        )

        total: int = db.session.scalar(count_statement) or 0

        rows = db.session.execute(statement).all()
        total_pages: int = (total + self.__perpage - 1) // self.__perpage if total > 0 else 0

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
            per_page=self.__perpage,
            total_pages=total_pages,
            page=page,
            has_next=(page < total_pages),
            has_previous=(page > 1)
        ).to_dict()

        return EmployeeHighRisk(model=model, data=data, pagination=pagination).to_dict()

    def get_employee_detail(self, employee_number: int) -> dict[str, Any]:
        employee: Employee | None = db.session.scalar(
            select(Employee).where(
                Employee.employee_number== employee_number
            )
        )

        if employee is None: return None

        predictions: list[EmployeePrediction] = (
            db.session.scalars(
                select(EmployeePrediction)
                .where(
                    EmployeePrediction.employee_number == employee_number
                )
                .order_by(
                    EmployeePrediction.model
                )
            ).all()
        )

        employee_data = EmployeeDetailData(
            employee_number=employee.employee_number,
            age=employee.age,
            business_travel=employee.business_travel,
            daily_rate=employee.daily_rate,
            department=employee.department,
            distance_from_home=employee.distance_from_home,
            education=employee.education,
            education_field=employee.education_field,
            employee_count=employee.employee_count,
            environment_satisfaction=employee.environment_satisfaction,
            gender=employee.gender,
            hourly_rate=employee.hourly_rate,
            job_involvement=employee.job_involvement,
            job_level=employee.job_level,
            job_role=employee.job_role,
            job_satisfaction=employee.job_satisfaction,
            marital_status=employee.marital_status,
            monthly_income=employee.monthly_income,
            monthly_rate=employee.monthly_rate,
            num_companies_worked=employee.num_companies_worked,
            over18=employee.over18,
            over_time=employee.over_time,
            percent_salary_hike=employee.percent_salary_hike,
            performance_rating=employee.performance_rating,
            relationship_satisfaction=employee.relationship_satisfaction,
            standard_hours=employee.standard_hours,
            stock_option_level=employee.stock_option_level,
            total_working_years=employee.total_working_years,
            training_times_last_year=employee.training_times_last_year,
            work_life_balance=employee.work_life_balance,
            years_at_company=employee.years_at_company,
            years_in_current_role=employee.years_in_current_role,
            years_since_last_promotion=employee.years_since_last_promotion,
            years_with_curr_manager=employee.years_with_curr_manager,
        ).to_dict()

        predictions_data = [
            PredictionDetailData(
                model=prediction.model,
                prediction=prediction.prediction,
                probability=prediction.probability,
                risk_level=prediction.risk_level,
                prediction_at=prediction.prediction_at,
            ).to_dict()
            for prediction in predictions
        ]

        return EmployeeDetail(employee=employee_data, predictions=predictions_data).to_dict()