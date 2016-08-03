Massdrop rest-api node.js
==========


Overview 
======
Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.

 

Example:

User submits www.google.com to your endpoint.  The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result.  The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com


Assumptions
=============

I assumed that jobs are created in FIFO basis; however,jobs are completed as soon the html for a requested job is processed. 

I also assumed that limiting the number of API calls, autentication, and crash recovery are out of scope for this particular challenge.


Installation
=============
To get started, run these commands from the terminal:
```
$ git clone https://github.com/michaelserna/REST-API-Job-Queue.git
$ cd REST-API-Job-Queue
$ npm install
$ npm start
```

Testing
=============
Mocha/Chai/Supertest server-side tests can be run by typing this command from the terminal:
```
$ mocha server/spec.js
```


File Structure
==========

```
BarHawk
  |-database
    |---controllers
    |---schema-model           
  |-router           
    |---api-routes 
  |-server              
    |---server
  |-testing
    |---spec
```

# API Docs

Create a new job with a post request
(using http pie module instead of curl for readability)

```http
http POST localhost:3000/api/v1/url url=http://www.google.com
```
Sucessful response:
```http

{
    "__v": 0,
    "_id": "57a140e194ffb91232e393c1",
    "createdAt": "August 2nd 2016, 5:54:57 pm",
    "status": "Your job in in progress",
    "url": "http://www.google.com"
}

```

Get all jobs:
GET /api/v1/url
```http
http GET localhost:3000/api/v1/url
```
Successful response:
```http
[
    {
        "__v": 0,
        "_id": "57a140e194ffb91232e393c1",
        "createdAt": "August 2nd 2016, 5:54:57 pm",
        "html": "<!doctype html>...</body></html>",
        "status": "Your job is completed",
        "url": "http://www.google.com"
    },
    {
        "__v": 0,
        "_id": "57a14624092083113344da9c",
        "createdAt": "August 2nd 2016, 6:17:57 pm",
        "html": "<!doctype html>...</body></html>",
        "status": "Your job is completed",
        "url": "http://www.nyt.com"
    }
]
```

Get an individual job through id param:
GET /api/v1/:id
```http
http GET localhost:3000/api/v1/57a140e194ffb91232e393c1
```
Successful response:
```http
{
    "__v": 0,
    "_id": "57a140e194ffb91232e393c1",
    "createdAt": "August 2nd 2016, 5:54:57 pm",
    "html": "<!doctype html>...</html>",
    "status": "Your job is completed",
    "url": "http://www.google.com"
}

```
Update an individual job through id param:
PUT /api/v1/:id job=oldUrl url=updatedUrl
```http
 http PUT localhost:3000/api/v1/57a14624092083113344da9c job=http://www.google.com url=http://www.espn.com url:'http://www.espn.com'
```
Successful response:
```http
{
    "__v": 0,
    "_id": "57a14624092083113344da9c",
    "createdAt": "August 2nd 2016, 6:17:24 pm",
    "html": "<!DOCTYPE html>.../html>\n",
    "status": "Your job is completed",
    "url": "http://www.espn.com"
}
```


Delete an individual job through id param:
DELETE /api/v1/:id 
```http
 DELETE /api/v1/57a14624092083113344da9c url:'http://www.espn.com'
```
Successful response (return job that was deleted):
```http
{
    "__v": 0,
    "_id": "57a14624092083113344da9c",
    "createdAt": "August 2nd 2016, 6:17:24 pm",
    "html": "<!DOCTYPE html>.../html>\n",
    "status": "Your job is completed",
    "url": "http://www.espn.com"
}
```