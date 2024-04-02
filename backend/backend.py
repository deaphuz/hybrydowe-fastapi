from fastapi import FastAPI
from fastapi import status, HTTPException
from pymongo import MongoClient
from typing import List
from model import *


app = FastAPI()
client = MongoClient()
def get_connection_to_document_database():
 database = client['failures']
 return database

@app.get("/auto")
async def get_auto(auto_id):
 db = get_connection_to_document_database()
 failure = db.offers.find_one({'auto_id': auto_id})
 if failure is None:
 raise HTTPException(
 status_code=status.HTTP_404_NOT_FOUND,
 detail=f'Car with id = {auto_id} was not found'
 )
 return car

@app.get('/failures', response_model=List[Failure])
async def get_failures():
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
async def modyi(id, failure: Failure):
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



