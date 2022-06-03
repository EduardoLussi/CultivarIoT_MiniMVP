const mongoose = require('mongoose');

const PDUAttribute = new mongoose.Schema({
    device_type_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DeviceType' 
    },
    attribute_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attribute' 
    },
});

module.exports = mongoose.model('pdu_attribute', PDUAttribute);