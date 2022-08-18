const mongoose = require('mongoose');

const SystemSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('system', SystemSchema);