const mongoose = require('mongoose');

const PDUAttribute = new mongoose.Schema({
    position: Number,
    deviceType: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DeviceType' 
    },
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attribute' 
    },
});

module.exports = mongoose.model('PDUAttribute', PDUAttribute);