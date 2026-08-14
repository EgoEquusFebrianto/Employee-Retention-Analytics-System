from dataclasses import dataclass, asdict
from typing import Any, List

@dataclass
class EmployeeHighRiskData:
    employee_number: int
    age: int
    department: str
    job_role: str
    prediction: str
    probability: float
    risk_level: str

    def to_dict(self):
        return asdict(self)

@dataclass
class EmployeeHighRiskPage:
    page: int
    per_page: int
    total: int
    total_pages: int
    has_next: bool
    has_previous: bool

    def to_dict(self):
        return asdict(self)

@dataclass
class EmployeeHighRisk:
    model: str
    data: List[dict[str, Any]]
    pagination: dict[str, Any]

    def to_dict(self):
        return asdict(self)

