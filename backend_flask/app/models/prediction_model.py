from datetime import datetime

from sqlalchemy import Integer, ForeignKey, String, Float, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.extention import db

class EmployeePrediction(db.Model):
    __tablename__ = "employee_predictions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    employee_number: Mapped[int] = mapped_column(
        ForeignKey(
            "employee.employee_number",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    model: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    prediction: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    probability: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    risk_level: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    prediction_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.now
    )

    employee: Mapped["Employee"] = relationship(
        "Employee",
        back_populates="predictions"
    )

    __table_args__ = (
        UniqueConstraint(
            "employee_number",
            "model",
            name="uq_employee_prediction_model"
        ),
    )