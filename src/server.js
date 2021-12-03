'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');

// server config
const port = process.env.PORT || 5000;

// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {

        // Setting Up Static File Serving from Public Folder
        app.use(express.static('public'))

        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

module.exports = start;


