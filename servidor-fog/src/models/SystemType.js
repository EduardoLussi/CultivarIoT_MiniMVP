const mongoose = require('mongoose');

const SystemTypeSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('system_type', SystemTypeSchema);