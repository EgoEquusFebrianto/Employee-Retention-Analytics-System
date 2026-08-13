from dataclasses import dataclass, asdict
from typing import Any, List


@dataclass
class RiskDistributionData:
    risk_level: str
    total: int

    def to_dict(self):
        return asdict(self)

@dataclass
class RiskDistribution:
    model: str
    data: List[dict[str, Any]]

    def to_dict(self):
        return asdict(self)
