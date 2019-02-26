// Require our models for syncing (grabs models/index.js which in turn grabs all models and returns object)
const db = require('../models');

const items = [
    {
        product_name: "iPhone X",
        department_name: "electronics",
        price: 1200,
        stock_quantity: 9,
        cart_quantity: 0
    },
    {
        product_name: "Holographic Charizard",
        department_name: "pokemon cards",
        price: 1399,
        stock_quantity: 2,
        cart_quantity: 0
    },
    {
        product_name: "Holographic Blastoise",
        department_name: "pokemon cards",
        price: 1199,
        stock_quantity: 5,
        cart_quantity: 0
    },
    {
        product_name: "Blue Elephant",
        department_name: "beanie babies",
        price: 589,
        stock_quantity: 10,
        cart_quantity: 0
    },
    {
        product_name: "Polar Bear",
        department_name: "beanie babies",
        price: 199,
        stock_quantity: 15,
        cart_quantity: 0
    },
    {
        product_name: "Chipper Jones Rookie Card",
        department_name: "trading cards",
        price: 100,
        stock_quantity: 4,
        cart_quantity: 0
    },
    {
        product_name: "Sammy Sosa Rookie Card",
        department_name: "trading cards",
        price: 290,
        stock_quantity: 2,
        cart_quantity: 0
    },
    {
        product_name: "Gameboy Advance",
        department_name: "electronics",
        price: 40,
        stock_quantity: 40,
        cart_quantity: 0
    },
    {
        product_name: "Sega Genesis",
        department_name: "electronics",
        price: 90,
        stock_quantity: 14,
        cart_quantity: 0
    },
];


db.sequelize.sync({ force: true }) 
    .then(() => {
        db.Product.bulkCreate(items)
        .then((rows) => {
            console.log('\n\nDATABASE SEEDED\n\n');
            db.sequelize.close();
        })  
        .catch((err) => {console.log("error: ",err)})
    })