# CS%5200 Project 2: Career Insight with MongoDB database
## How to find the required parts

A. The requirements document as a PDF: in "design documents" folder

B. UML Class Diagram as an embedded JPG/PNG: in "design documents" folder

C. Definition of Documents/Collections/Tables as example JSON objects: in "design documents" folder

D. Initialization files for the database containing the mockup data in CSV or Extended JSON format as well as instructions on how to initialize the database: in `db/data`

E. The code of your basic application with a proper README file: all the other files

F. 5 example queries: in `queries` folder. Note: need the `mongoUtils.js` file to operate

### Importing the data
In terminal

```mongoimport -d career_insight -c job_update mongodb://localhost:27017 data/job_update.json --jsonArray```

replace "job_update" to users, positions, and applications to import other data, you can also use the dump file to re create the database

### Create the dump file

```mongodump --db your_database_name```


### Run separate queries

```npm install```

```node queries/query1.js```

replace query1 to query2 and ect. for other example queries

### Run the node application
```npm install``` (if haven't install)
```npm start```

and the application is running on http://localhost:3000/

### The CRUD operations

This application implemented CRUD operation for the users table and the positions table, feel free to try it out