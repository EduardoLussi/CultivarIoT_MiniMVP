const SystemType = require('../models/SystemType');

module.exports = {
    async showAll(req, res) {
        const systemTypes = await SystemType.find();
        
        let system_type_ids = [];

        for (let i = 0; i < systemTypes.length; i++) {
            const { _id, name } = systemTypes[i];
            system_type_ids.push({ _id, name });
        }

        return res.json(system_type_ids);
    }
}