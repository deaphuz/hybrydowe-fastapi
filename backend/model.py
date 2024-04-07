from pydantic import BaseModel

class Failure(BaseModel):
    failureType: str
    name: str
    date: str
    potentialPrice: float
    potentialDate: str
    status: str
    repairDescription: str