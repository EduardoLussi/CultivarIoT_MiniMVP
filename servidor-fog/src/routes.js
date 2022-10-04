/**
 * ROUTES
 */

// Import express
const express = require('express');

// Import controllers
const PayloadController = require('./controllers/PayloadController');
const SystemTypeController = require('./controllers/SystemTypeController');
const SystemController = require('./controllers/SystemController');

const routes = new express.Router();

// Get SystemTypes
routes.get('/systemTypes', SystemTypeController.showAll);

// Get Systems of a SystemType
routes.get('/systems', SystemController.showAll);

// Change desired value of an Attribute in a System
routes.post('/systems/attribute/target_value', SystemController.changeTargetValue);

// Toggle the control of an Attribute in a System
routes.post('/systems/attribute/toggleControl', SystemController.toggleAttributeControl);

// Store a Payload
routes.post('/payload', PayloadController.store);

// Get Payloads
routes.get('/payload', PayloadController.show);

module.exports = routes;