requirements:
Python 3.12
node.js
MongoDB

run frontend:
cd src
npm install
npm start

run backend:
cd backend
uvicorn backend:app --reload

run db:
mongod --dbpath "path-for-database, ex: C:\MongoFiles\data\db"