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

@app.post('/failures/', response_model=Failure)
def create_failure(failure: Failure):
    failure_dict = failure.model_dump()
    database.failures.insert_one(failure_dict)
    return failure


@app.put('/failures/{name}', response_model=Failure)
def update_failure(name: str, updated_failure: Failure):
    failure = database.failures.find_one({"name": name})
    if failure:
        database.failures.update_one({"name": name}, {"$set": updated_failure.model_dump()})
        return failure
    raise HTTPException(status_code=404, detail="Failure not found")

@app.get("/failures")
async def get_failure(failure_id):
 failure = database.failures.find_one({'failure_id': failure_id})
 if failure is None:
     raise HTTPException(
     status_code=status.HTTP_404_NOT_FOUND,
     detail=f'Failure with id = {failure_id} was not found'
 )
 return failure

@app.get('/failures/', response_model=List[Failure])
async def get_failures():
    cursor = database.failures.find()
    return cursor

@app.get('/failures/{name}', response_model=Failure)
def get_failure(name: str):
    failure = database.failures.find_one({"name": name})
    if failure:
        return failure
    raise HTTPException(status_code=404, detail="Failure not found")

@app.delete('/failures/{name}', response_model=dict)
def delete_failure(name: str):
    failure = database.failures.find_one({"name": name})
    if failure:
        database.failures.delete_one({"name": name})
        return {"message": "Failure deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Failure not found")