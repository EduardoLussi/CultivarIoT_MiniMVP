/**
 * System model for mongodb database
 * System is a specific System of SystemType
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SystemSchema = new mongoose.Schema({
    name: String,
    system_type: {  // Type of the System
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'system_type' 
    }
});

// Exports mongoose model for collection 
// system of SystemSchema
module.exports = mongoose.model('system', SystemSchema);