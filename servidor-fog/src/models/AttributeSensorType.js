const mongoose = require('mongoose');

const AttributeSensorType = new mongoose.Schema({
    attribute_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    sensor_type_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    }
});

module.exports = mongoose.model('attribute_sensor_type', AttributeSensorType);