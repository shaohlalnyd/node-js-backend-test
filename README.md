
# run project

for run this code,first of all you must install nodejs and npm.
after that in the prject root open terminal and type  `npm install`.
after that t\if you type `npm run start` project runs in port `3000` of `localhost`.


# run tests

for running tests you must type `npm run test`  in project root directory.

# project structure

## src

project codes in here.

this directory contains `__tests__` ,`controllers`,`dtos`,`middlewares`,`models` and `services`

and have `app.ts` file.

### tests

contain one file with `category.test.ts` that contains test codes.

### controllers

writed projects routes and get reuest and send response is controller task.

### dtos

user input and outputs for api calls.

### middlewares

contains project middlewares.

#### error-middleware.ts

handle custom errors in project and send error to client.

### models

db models is here.

### services

every service is called by controller and service role is get data from database 
and some processing on it and send data or send errors.

### app.ts

define routes and middlewares and some express options