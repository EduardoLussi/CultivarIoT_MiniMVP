const mongoose = require('mongoose');

const AttributeSensorType = new mongoose.Schema({
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    sensor_type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    }
});

module.exports = mongoose.model('attribute_sensor_type', AttributeSensorType);