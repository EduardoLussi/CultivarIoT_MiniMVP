const mongoose = require('mongoose');

const SystemSchema = new mongoose.Schema({
    name: String,
    system_type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'system_type' 
    }
});

module.exports = mongoose.model('system', SystemSchema);