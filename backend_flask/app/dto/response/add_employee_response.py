from dataclasses import dataclass, asdict
from typing import List

@dataclass
class ImportEmployeeResponse:
    inserted: int
    skipped: int
    duplicate_employee_numbers: List[int]
    employee_numbers: List[int]

    def to_dict(self):
        return asdict(self)