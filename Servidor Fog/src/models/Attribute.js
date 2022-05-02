const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    name: String,
    size: Number,
    unit: String
});

module.exports = mongoose.model('Attribute', AttributeSchema);