const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    order_items: {
        type: Array
    },
    order_subtotal: {
        type: Number
    },
    order_name: {
        type: String
    },
    order_phone: {
        type: String
    },
    order_email: {
        type: String
    },
    order_done: {
        type: Boolean
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Order', Order);