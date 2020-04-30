const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    color: {
        type: Number
    },
    about: {
        type: String
    },
    stock: {
        type: Boolean
    }
});

module.exports = mongoose.model('Item', Item);