const express = require('express');

const PayloadController = require('./controllers/PayloadController');
const SystemTypeController = require('./controllers/SystemTypeController');
const SystemController = require('./controllers/SystemController');

const routes = new express.Router();

routes.get('/systemTypes', SystemTypeController.showAll);
routes.get('/systems', SystemController.showAll);
routes.post('/systems/attribute/target_value', SystemController.changeTargetValue);
routes.post('/systems/attribute/toggleControl', SystemController.toggleAttributeControl);
routes.post('/payload', PayloadController.store);
routes.get('/payload', PayloadController.show);

module.exports = routes;