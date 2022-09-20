const mongoose = require('mongoose');

const ActuatorSystemAttributesSchema = new mongoose.Schema({
    actuator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator'
    },
    system_attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_attribute'
    },
});

module.exports = mongoose.model('actuator_system_attribute', ActuatorSystemAttributesSchema);