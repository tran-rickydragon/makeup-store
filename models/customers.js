const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customersSchema = new Schema({
    _id: {
        type: String, 
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    date_created: {
        type: Date
    },
    products: {
        type: Array
    }
},
{collection: 'customers'}
);

module.exports = mongoose.model('customers', customersSchema)