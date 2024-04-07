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


@app.post('/failures/', response_model=Failure)
def create_failure(failure: Failure):
    failure_dict = failure.model_dump()
    database.failures.insert_one(failure_dict)
    return failure

@app.post("/failures/{name}")
async def modify_failure(name: str, updated_failure: Failure):
    failure = database.failures.find_one({"name": name})
    if failure:
        database.failures.update_one({"name": name}, {"$set": updated_failure.model_dump()})
        return updated_failure
    raise HTTPException(status_code=404, detail="Failure not found")

@app.put('/failures/{name}', response_model=Failure)
def update_failure(name: str, updated_failure: Failure):
    failure = database.failures.find_one({"name": name})
    if failure:
        failure.status = updated_failure.status
        failure.repair_description = updated_failure.repair_description
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
async def delete_failure(name: str):
    failures = await database.failures.find().to_list(length=None)
    for f in failures:
        if f.name == name:
            failures.remove(f)
            return {"message": "Failure deleted successfully"}
    raise HTTPException(status_code=404, detail="Failure not found")