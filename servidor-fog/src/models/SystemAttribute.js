const mongoose = require('mongoose');

const SystemAttributeSchema = new mongoose.Schema({
    system_type_attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_type_attribute'
    },
    system: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system'
    },
    target_value: Number,
    active: Boolean
});

module.exports = mongoose.model('system_attribute', SystemAttributeSchema);