/**
 * Attribute model for mongodb database
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const AttributeSchema = new mongoose.Schema({
    name: String,
    unit: String
});

// Exports mongoose model for collection attribute of AttributeSchema
module.exports = mongoose.model('attribute', AttributeSchema);