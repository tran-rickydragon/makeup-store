//import packages needed
const express = require('express');
const mongoose = require('mongoose');
const server = express();
require ("dotenv").config();
const cors = require('cors');
//creation of app using express
server.use(cors());
server.use(express.json());
//axios for api
const axios = require('axios');

//Setting up mongoose connection to DB
mongoose.connect(process.env.MONGO_URL)  
.then(() => {
console.log("Database connection Success!");
 })
.catch((err) => {
 console.error("Mongo Connection Error", err);
});
//Declared port number 3333 for requirement 1
const port = process.env.port || 3333;
server.listen(port, ()=>{
    console.log('app listening on port 3333')
});
//error catcher
server.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

//import schemas for products and customers
let productsModel = require('./models/products');
let customersModel = require('./models/customers');

//endpoint for reading all products from mongdb
server.get('/products', (req, res, next) => { //get request for JSON data in postman
    productsModel.find((error, data) => {
        if (error) {
            return next(error)
        } 
        else {
            res.json(data)
        }
    })
});

//endpoint for reading all customers from mongdb
server.get('/customers', (req, res, next) => { //get request for JSON data in postman
  customersModel.find((error, data) => {
      if (error) {
          return next(error)
      } 
      else {
          res.json(data)
      }
  })
});

//endpoint for posting new product in mongodb
server.post('/create/product', (req, res, next) => { //post request for JSON data in postman
    productsModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.send('Product added to the database');
        }
      })
  });

//endpont for posting new customer
server.post('/create/customer', (req, res, next) => { //post request for JSON data in postman
    var _id = req.body._id //turns _id into variable _id
    var fullName = req.body.fullName //turns fullName into variable fullName
    var date_created = Date() //variable to get the current date
    customersModel.create({_id: _id, fullName: fullName, date_created: date_created}, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.send('Customer added to the database');
        }
      })
  });

//endpont for updating new customer
server.put('/update/customer/:_id', (req, res, next) => {//ID here is given in the address
    customersModel.findByIdAndUpdate(req.params._id, {$set: req.body}, (error, data) => {
        if (error) {
            return next(error);
        } else {
          res.json(data)
          console.log('customer update successful!')
        }
      })
  });

//endpoint for deleting a customer
server.delete('/delete/customer/:_id', (req, res, next) => { //post request for JSON data in postman
  customersModel.findByIdAndRemove(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.send('customer deleted from database');
      }
    })
});

//Enpoint for getting products from API 
server.get('/makeup', function(req, res){ 
    //added parameter to only get products with a rating greater than 4.9 meaning only products rated a 5
    //this will only return 86 products 
    var URL = ('http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9') 
    axios.get(URL)
    .then(response=>{
        res.status(200).json("Success");
        productsModel.create(response.data) //the 86 products are then added to products in mongoDB
    })
    .catch((error) => {
        res.status(500).json({message: error });
    });
});

//Linking customers to products they buy
server.get('/link', (req, res, next) => { //postman get request for JSON data
    var name = req.body.name //turns name from JSON data get to variable name
    var productid = req.body.productid //turns productid from JSON data to variable productid
    //update customersModel with name and productid
    //updates the products array with productid based on fullName
    //https://docs.mongodb.com/manual/reference/operator/update/push/ 
    customersModel.update({fullName: name}, {$push: {products: productid}}, (error, data) => {
        if (error) {
            return next(error);
        } else {
          res.status(200).json('Success')
          console.log('Link Successful')
        }
      });
  });
