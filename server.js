// Dependencies
const express = require('express');
const PORT = process.env.PORT || 8080;

// Create the server
const app = express();

// Require our models for syncing (grabs models/index.js which in turn grabs all models and returns object)
const db = require('./models');

// Middleware (i.e. for data parsing POST requests)
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json());// parse application/json

// Routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true })
.then(function() {
    app.listen(PORT, function() {
      console.log('App listening on PORT ' + PORT);
    });
});