const System = require('../models/System');
const Sensor = require('../models/Sensor');
const Attribute = require('../models/Attribute');
const SystemTypeAttribute = require('../models/SystemTypeAttribute');
const SystemAttribute = require('../models/SystemAttribute');
const SensorSystemAttribute = require('../models/SensorSystemAttribute');

module.exports = {
    async showAll(req, res) {
        try {
            const { system_type } = req.headers;
        
            const systems = await System.find({ system_type });
            const systemTypeAttributes = await SystemTypeAttribute.find({ system_type });
            
            systemsInfo = []
            for (let i = 0; i < systems.length; i++) {
                const { _id: systemId, name } = systems[i];
                systemInfo = { _id: systemId, name };

                systemInfo.attributes = [];
                for (let j = 0; j < systemTypeAttributes.length; j++) {
                    const { _id: idSystemTypeAttribute, attribute } = systemTypeAttributes[j];
                    const { _id } = await SystemAttribute.findOne({ system: systemId, system_type_attribute: idSystemTypeAttribute });
                    
                    const { name, unit } = await Attribute.findOne({ _id: attribute.toString() });
                    systemInfo.attributes.push({ _id: attribute.toString(), name, unit, sensors: [] });

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
            console.log(error);
            return res.json([]);
        }
    }
}