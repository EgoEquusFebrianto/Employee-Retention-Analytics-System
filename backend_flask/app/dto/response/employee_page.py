from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List, Any

@dataclass
class Data:
    employee_number: int
    age: int
    department: str
    job_role: str
    model: str
    prediction: str
    probability: float
    risk_level: str
    prediction_at: datetime

    def to_dict(self):
        return asdict(self)

@dataclass
class PaginationInfo:
    page: int
    per_page: int
    total: int
    total_pages: int
    has_next: bool
    has_previous: bool

    def to_dict(self):
        return asdict(self)

@dataclass
class EmployeePage:
    data: List[dict[str, Any]]
    pagination: PaginationInfo

    def to_dict(self):
        return asdict(self)