const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoutes = express.Router();
const PORT = 4000;

let Order = require('./orders.model');

app.use(cors());
app.use(bodyParser.json());

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/orders', { useNewUrlParser: true });

//mongoose.connect('mongodb://127.0.0.1:27017/hcg', { useNewUrlParser: true });
//const connection = mongoose.connection;

db.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//retrieve list of orders
/*orderRoutes.route('/').get(function(req, res) {
    console.log("here again");
    Order.find(function(err, order) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(order);
        }
    });
    return;
});*/
app.get('/orders', async(req, res) => {
    console.log("here");

    const orders = await Order.findOne({order_id: "asdf"}).exec()
    res.json(orders);
    // Order.find({}, function(err, order) {
    //     console.log(order);
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         res.json(order);
    //     }
    // });
    return;
})

//retrieve one order based on id
app.get('orders/:id', (req, res) => {
    let id = req.params.id;
    Order.findById(id, function(err, order) {
        res.json(order);
    });
}) 

//add an order
app.post("/orders/add", (req, res) => {
    var order = new Order(req.body);
    console.log(order);
    order.save()
        res.status(200).send("added item successfully"); //http status 200, successful
        /*.then(order => {
            
        })
        .catch(err => {
            res.status(400).send('adding new order failed');
        });*/
})

//update existing order
orderRoutes.route('orders/update/:id').post(function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if(!order)
            res.status(404).send('order not found');
        else
            order.order_items = req.body.order_items;
            order.order_subtotal = req.body.order_subtotal;
            order.order_datetime = req.body.order_datetime;
            order.order_name = req.body.order_name;
            order.order_phone = req.body.order_phone;
            order.order_email = req.body.order_email;
            order.order_done = req.body.order_email;

            order.save().then(order => {
                res.json('Order updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
    });
});

//delete order
/*orderRoutes.route('/delete/:id').post(function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if(!order)
            res.status(404).send('order not found');
        else
            
    })
})*/

app.use('/orders', orderRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});