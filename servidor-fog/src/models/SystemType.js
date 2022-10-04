/**
 * SystemType model for mongodb database
 * SystemType specifies a type of a system
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SystemTypeSchema = new mongoose.Schema({
    name: String
});

// Exports mongoose model for collection system_type
// of SystemTypeSchema
module.exports = mongoose.model('system_type', SystemTypeSchema);