from pydantic import BaseModel

class Failure(BaseModel):
    failure_type: str
    name: str
    date: str
    potential_price: float
    potential_date: str
    status: str
    repair_description: str