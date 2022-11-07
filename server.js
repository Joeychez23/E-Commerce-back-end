const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const createDatabase = require('./db/schema.sql');
// import sequelize connection

const seedCategories = require('./seeds/category-seeds.js')
const seedProduct = require('./seeds/product-seeds.js')
const seedProductTag = require('./seeds/product-tag-seeds.js');
const seedTag = require('./seeds/tag-seeds.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

// sync sequelize models to the database, then turn on the server
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    insecureAuth: true
});


connection.query(createDatabase, function (error) {
    if (error) {
        console.log(error)
    }
    if (!error) {
    }
})

connection.end();

setTimeout(async function () {
    
    await sequelize.sync({ force: false }).then(() => {
        app.listen(PORT, () => console.log('Now listening'));
    });
    await seedCategories();
    await seedProduct();
    await seedTag();
    await seedProductTag();

     

}, 100);
