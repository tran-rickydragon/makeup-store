const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsSchema = new Schema({
    _id: {
        type: String, 
        default: uuid.v1
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product_type: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
},
{collection: 'products'}
);

module.exports = mongoose.model('products', productsSchema)