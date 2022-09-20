const mongoose = require('mongoose');

const ActuatorSchema = new mongoose.Schema({
    address: String,
    actuator_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator_type'
    }
});

module.exports = mongoose.model('actuator', ActuatorSchema);