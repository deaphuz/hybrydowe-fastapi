from fastapi import FastAPI
from fastapi import status, HTTPException
from pymongo import MongoClient
from typing import List

import model
from model import Failure

mongo_uri = "mongodb://localhost:27017"
database_name = "failures_db"

# Connect to MongoDB


app = FastAPI()
client = MongoClient(mongo_uri)
database = client[database_name]


# def get_connection_to_document_database():
# database = client['failures']
# return database

# db = get_connection_to_document_database("mongodb://localhost:27017")

@app.get("/failures")
async def get_failure(failure_id):
 failure = db.failures.find_one({'failure_id': failure_id})
 if failure is None:
     raise HTTPException(
     status_code=status.HTTP_404_NOT_FOUND,
     detail=f'Failure with id = {failure_id} was not found'
 )
 return failure

@app.get('/failures', response_model=List[Failure])
async def get_failures():
    failures = await db.failures.find().to_list(length=None)
    return failures

@app.post('/failures', response_model=Failure)
async def create_failure(failure: Failure):
    failures.append(failure)
    return failure

@app.get('/failures/{name}', response_model=Failure)
async def get_failure(name: str):
    for f in failures:
        if f.name == name:
            return f
    raise HTTPException(status_code=404, detail="Failure not found")

@app.put('/failures/{name}', response_model=Failure)
async def update_failure(name: str, updated_failure: Failure):
    for f in failures:
        if f.name == name:
            f.status = updated_failure.status
            f.repair_description = updated_failure.repair_description
            return f
    raise HTTPException(status_code=404, detail="Failure not found")

@app.delete('/failures/{name}', response_model=dict)
def delete_failure(name: str):
    for f in failures:
        if f.name == name:
            failures.remove(f)
            return {"message": "Failure deleted successfully"}
    raise HTTPException(status_code=404, detail="Failure not found")

@app.post("/auto")
async def modify(id, failure: Failure):
    db = get_connection_to_document_database()
    car_query = {"id": id}
    car_values = {"$set": {
    "id": car.id,
    "name": car.name,
    "mark": car.mark,
    "production_year": car.production_year,
    "price": car.price
    }}
    db.offers.update_one(car_query, car_values)
    return car



