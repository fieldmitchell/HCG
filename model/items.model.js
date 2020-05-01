const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Items = new Schema({
    item_title: {
        type: String
    },
    item_category: {
        type: String
    },
    item_subcategory: {
        type: String
    },
    item_price: {
        type: Number
    },
    item_quantity: {
        type: Number
    },
    item_colors: {
        type: Array
    },
    item_about: {
        type: String
    },
    item_stock: {
        type: Boolean
    }
});

module.exports = mongoose.model('Items', Items);