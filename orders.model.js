const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    order_id: {
        type: String
    },
    order_items: {
        type: Array
    },
    order_subtotal: {
        type: Number
    },
    order_datetime: {
        type: Date
    },
    order_name: {
        type: String,
        required: true
    },
    order_phone: {
        type: String,
        required: true
    },
    order_email: {
        type: String,
        required: false
    },
    order_done: {
        type: Boolean
    }
});

module.exports = mongoose.model('Order', Order);