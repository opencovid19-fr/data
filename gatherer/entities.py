from dataclasses import dataclass


@dataclass
class Result:
    region: str
    confirmed_cases: int
