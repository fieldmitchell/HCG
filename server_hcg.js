const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = express.Router();
const PORT = 4000;

let Item = require('./hcg.model');

app.use(cors());
app.use(bodyParser.json());

var db = mongoose.createConnection('mongodb://localhost:27017/hcg', { useNewUrlParser: true });

//mongoose.connect('mongodb://127.0.0.1:27017/hcg', { useNewUrlParser: true });
//const connection = mongoose.connection;

db.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//retrieve list of items
itemRoutes.route('/').get(function(req, res) {
    Item.find(function(err, item) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(item);
        }
    });
});

//retrieve one item based on id
itemRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

//sending a post request to add item
itemRoutes.route('/add').post(function(req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'}); //http status 200, successful
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

//update existing item
itemRoutes.route('/update/:id').post(function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if(!item)
            res.status(404).send('item not found');
        else
            item.item_title = req.body.item_title;
            item.item_category = req.body.item_category;
            item.item_price = req.body.item_price;
            item.item_quantity = req.body.item_quantity;
            item.item_color = req.body.item_color;
            item.item_about = req.body.item_about;
            item.item_stock = req.body.item_stock;

            item.save().then(item => {
                res.json('Item updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
    });
});

app.use('/hcg', itemRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});