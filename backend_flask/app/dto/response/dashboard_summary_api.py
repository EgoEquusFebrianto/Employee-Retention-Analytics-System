from dataclasses import dataclass, asdict
from typing import Any

@dataclass
class SummaryData:
    total_employees: int
    predicted_attrition: int
    predicted_retention: int
    high_risk: int
    medium_risk: int
    low_risk: int

    def to_dict(self):
        return asdict(self)

@dataclass
class SummaryApi:
    model: str
    summary: dict[str, Any]

    def to_dict(self):
        return asdict(self)