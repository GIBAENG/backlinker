const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routeHome = require('./routes/home.js');

require('dotenv').config();

function set() {
    app.set('view engine', 'ejs');

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to DB');
        }).catch((err) => {
            console.log(err);
        });

}

function middlewares() {
    app.use(express.static('./public'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
}

function routes() {
    app.use('/', routeHome);
}

function server() {
    app.listen(8000, () => {
        console.log('Listening on port #8000');
    });
}

function App() {
    set();
    middlewares();
    routes();
    server();
}

App();
