const express = require('express');

const PayloadController = require('./controllers/PayloadController');
const DeviceTypeController = require('./controllers/DeviceTypeController');

const routes = new express.Router();

routes.get('/devices', DeviceTypeController.showAll);
routes.get('/device', DeviceTypeController.show);
routes.post('/payload', PayloadController.store);
routes.get('/payload', PayloadController.show);

module.exports = routes;