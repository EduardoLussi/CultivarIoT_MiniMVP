const mongoose = require('mongoose');

const SystemTypeAttributeSchema = new mongoose.Schema({
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    actuator_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator_type'
    },
    sensor_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sensor_type'
    },
    system_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_type'
    },
});

module.exports = mongoose.model('system_type_attribute', SystemTypeAttributeSchema);