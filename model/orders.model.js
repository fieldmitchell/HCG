const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    items: {
        type: Array
    },
    subtotal: {
        type: Number
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    done: {
        type: Boolean
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Order', Order);