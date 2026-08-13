from dataclasses import dataclass, asdict
from typing import List, Any

@dataclass
class JobRoleRiskData:
    job_role: str
    total_employees: int
    predicted_attrition: int
    high_risk: int

    def to_dict(self):
        return asdict(self)

@dataclass
class JobRoleRisk:
    model: str
    data: List[dict[str, Any]]

    def to_dict(self):
        return asdict(self)
