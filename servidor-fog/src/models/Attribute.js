const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    name: String,
    unit: String
});

module.exports = mongoose.model('attribute', AttributeSchema);