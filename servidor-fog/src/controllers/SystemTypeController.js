/**
 * Controller for SystemType
 */

// Import schemas
const SystemType = require('../models/SystemType');

module.exports = {
    /**
     * Returns all SystemTypes
     */
    async showAll(req, res) {
        // Get all SystemTypes
        const systemTypes = await SystemType.find();
        
        // Creates a JSON with all the SystemTypes
        let system_type_ids = [];
        for (let i = 0; i < systemTypes.length; i++) {
            const { _id, name } = systemTypes[i];
            system_type_ids.push({ _id, name });
        }

        return res.json(system_type_ids);
    }
}