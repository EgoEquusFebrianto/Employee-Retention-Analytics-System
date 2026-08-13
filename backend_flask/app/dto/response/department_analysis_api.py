from dataclasses import dataclass, asdict
from typing import Any, List


@dataclass
class AttritionDepartmentData:
    department: str
    total_employees: int
    predicted_attrition: int
    high_risk: int

    def to_dict(self):
        return asdict(self)

@dataclass
class AttritionDepartment:
    model: str
    data: List[dict[str, Any]]

    def to_dict(self):
        return asdict(self)