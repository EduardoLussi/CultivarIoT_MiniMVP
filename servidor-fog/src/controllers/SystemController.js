/**
 * Controller for the System
 */

// Import schemas
const System = require('../models/System');
const Sensor = require('../models/Sensor');
const Attribute = require('../models/Attribute');
const SystemTypeAttribute = require('../models/SystemTypeAttribute');
const SystemAttribute = require('../models/SystemAttribute');
const SensorSystemAttribute = require('../models/SensorSystemAttribute');

module.exports = {
    /**
     * Returns all Systems of a SystemType
     */
    async showAll(req, res) {
        try {
            // Get SystemType from header
            const { system_type } = req.headers;
            
            // Get all Systems of the SystemType
            const systems = await System.find({ system_type });
            // Get all Attribute controls of the SystemType
            const systemTypeAttributes = await SystemTypeAttribute.find({ system_type });
            
            // Mounts a JSON with Systems informations
            systemsInfo = []
            for (let i = 0; i < systems.length; i++) {
                // Get name and _id
                const { _id: systemId, name } = systems[i];
                systemInfo = { _id: systemId, name };

                // Get Attributes and its Sensors of the System
                systemInfo.attributes = [];
                for (let j = 0; j < systemTypeAttributes.length; j++) {
                    const { _id: idSystemTypeAttribute, attribute } = systemTypeAttributes[j];
                    // Get System control that implements SystemTypeAttribute
                    const { _id, target_value, active } = await SystemAttribute.findOne({ system: systemId, system_type_attribute: idSystemTypeAttribute });
                    
                    // Get Attribute informations
                    const { name, unit } = await Attribute.findOne({ _id: attribute.toString() });
                    systemInfo.attributes.push({ _id: attribute.toString(), name, unit, target_value, active, sensors: [] });

                    // Get all sensors that read the Attribute
                    const sensorSystemAttributes = await SensorSystemAttribute.find({ system_attribute: _id });
                    for (let k = 0; k < sensorSystemAttributes.length; k++) {                                     
                        const { _id, name } = await Sensor.findOne({ _id: sensorSystemAttributes[k].sensor });
                        systemInfo.attributes[j].sensors.push({ _id: _id.toString(), name });
                    }
                }

                systemsInfo.push(systemInfo);
            }
            
            return res.json(systemsInfo);
        } catch (error) {
            // console.log(error);
            return res.json([]);
        }
    },

    /**
     * Change the desired value of an Attribute for a System
     */
    async changeTargetValue(req, res) {
        try {
            // Get System and Attribute from header
            const { system, attribute } = req.headers;
            
            // Get the type of the System
            const { system_type } = await System.findOne({ _id: system });
            
            // Get the type of control of SystemType and Attribute
            const { _id: system_type_attribute } = await SystemTypeAttribute.findOne({ attribute, system_type });
            
            // Get the new desired value for the Attribute from header
            const { target_value } = req.body;

            // Update the desired value in the System control over the Attribute
            await SystemAttribute.findOneAndUpdate({ system, system_type_attribute }, { target_value });

            return res.json({ target_value });
        } catch(error) {
            console.log(error);
            return res.json({ target_value: false });
        }
    },

    /**
     * Toggle the Attribute control of a System
     */
    async toggleAttributeControl(req, res) {
        try {
            // Get System and Attribute from header
            const { system, attribute } = req.headers;
            
            // Get the type of the System
            const { system_type } = await System.findOne({ _id: system });
            
            // Get the type of control of SystemType and Attribute
            const { _id: system_type_attribute } = await SystemTypeAttribute.findOne({ attribute, system_type });
            
            // Get from header if the control is going to be turned ON or OFF
            const { active } = req.body;

            // Update the control value in the System control over the Attribute
            await SystemAttribute.findOneAndUpdate({ system, system_type_attribute }, { active });

            return res.json({ active });
        } catch(error) {
            console.log(error);
            return res.json(null);
        }
    }
}