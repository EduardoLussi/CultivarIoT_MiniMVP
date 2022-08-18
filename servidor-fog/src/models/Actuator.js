const mongoose = require('mongoose');

const ActuatorSchema = new mongoose.Schema({
    system_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'system' 
    },
    address: String
});

module.exports = mongoose.model('actuator', ActuatorSchema);