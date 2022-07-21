# makeup-store
This is a small project I made for a class. This uses MongoDB to create a database for customers and products. An API pulls filtered products based on how you edit the url into the database to use with the customers.

##setup

##MongoDB
download and install MongoDB Compass
run it on pc

##VS Code
npm install
node server.js

##connect code to MongoDB
make sure url in .env file in project matches url in MongoDB compass
then start connection

##Testing
test using postman
Adding products example:
POST http://localhost:3333/create/customer
JSON Body:
{
    "_id": "1",
    "fullName": "Mona Megistus",
    "date_created": "2022-05-09"
}
