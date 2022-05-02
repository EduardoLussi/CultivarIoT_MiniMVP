const express = require('express');

const PayloadController = require('./controllers/PayloadController');

const routes = new express.Router();

routes.post('/payload', PayloadController.store);
routes.get('/payload', PayloadController.show);

module.exports = routes;