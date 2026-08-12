from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app import db

class Employee(db.Model):
    __tablename__ = "employee"

    age: Mapped[int | None] = mapped_column(Integer)
    # attrition: Mapped[str | None] = mapped_column(String(10))

    business_travel: Mapped[str | None] = mapped_column(String(50))
    daily_rate: Mapped[int | None] = mapped_column(Integer)
    department: Mapped[str | None] = mapped_column(String(100))
    distance_from_home: Mapped[int | None] = mapped_column(Integer)
    education: Mapped[int | None] = mapped_column(Integer)
    education_field: Mapped[str | None] = mapped_column(String(100))
    employee_count: Mapped[int | None] = mapped_column(Integer)

    employee_number: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    environment_satisfaction: Mapped[int | None] = mapped_column(Integer)
    gender: Mapped[str | None] = mapped_column(String(20))
    hourly_rate: Mapped[int | None] = mapped_column(Integer)
    job_involvement: Mapped[int | None] = mapped_column(Integer)
    job_level: Mapped[int | None] = mapped_column(Integer)
    job_role: Mapped[str | None] = mapped_column(String(100))
    job_satisfaction: Mapped[int | None] = mapped_column(Integer)
    marital_status: Mapped[str | None] = mapped_column(String(50))

    monthly_income: Mapped[int | None] = mapped_column(Integer)
    monthly_rate: Mapped[int | None] = mapped_column(Integer)
    num_companies_worked: Mapped[int | None] = mapped_column(Integer)

    over18: Mapped[str | None] = mapped_column(String(10))
    over_time: Mapped[str | None] = mapped_column(String(10))

    percent_salary_hike: Mapped[int | None] = mapped_column(Integer)
    performance_rating: Mapped[int | None] = mapped_column(Integer)
    relationship_satisfaction: Mapped[int | None] = mapped_column(Integer)
    standard_hours: Mapped[int | None] = mapped_column(Integer)
    stock_option_level: Mapped[int | None] = mapped_column(Integer)

    total_working_years: Mapped[int | None] = mapped_column(Integer)
    training_times_last_year: Mapped[int | None] = mapped_column(Integer)
    work_life_balance: Mapped[int | None] = mapped_column(Integer)

    years_at_company: Mapped[int | None] = mapped_column(Integer)
    years_in_current_role: Mapped[int | None] = mapped_column(Integer)
    years_since_last_promotion: Mapped[int | None] = mapped_column(Integer)
    years_with_curr_manager: Mapped[int | None] = mapped_column(Integer)

    predictions: Mapped[list["EmployeePrediction"]] = relationship(
        "EmployeePrediction",
        back_populates="employee",
        cascade="all, delete-orphan"
    )