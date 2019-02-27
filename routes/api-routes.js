// Import our db models and dependencies
const db = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {

    // GET PRODUCT LIST
    app.get('/api/productlist', function(req, res) { //get the list from db and send back
        db.Product.findAll({})
        .then((products) => {
            res.json(products)
        })
        .catch( (err) => {
            res.json({error: err})
        });
    });

   
    // GET CART LIST
    app.get('/api/cart', function(req, res) { // get rows that have value greater than zero in shopping cart 
        db.Product.findAll({
            where: {
                cart_quantity: {
                    [Op.gt]: 0
                }
            }
        })
        .then((products) => {
            res.json(products)
        })
        .catch( (err) => {
            res.json({error: err})
        });
    });


    // UPDATE A PRODUCT
    app.post('/api/productlist/:name', function(req, res) { // check qty, then update qty if can, then 
        const productName= req.params.name;
        const updateReq = req.body; // update request format: {entire product row}
        db.Product.update(
            updateReq,
            { where: { product_name: productName }})
            .then( (product) => { res.json(product) } )
            .catch( (err) => { res.json({error: err} ) } )
    });





}