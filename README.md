### Import the data
```mongoimport -d career_insight -c job_update mongodb://localhost:27017 data/job_update.json --jsonArray```
replace "job_update" to users, positions, and applications to import other data
### Create the dump file
```mongodump --db your_database_name```