const mongoose = require('mongoose');

const DeviceTypeSchema = new mongoose.Schema({
    name: String,
    byteId: String
});

module.exports = mongoose.model('DeviceType', DeviceTypeSchema);