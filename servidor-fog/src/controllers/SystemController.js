const System = require('../models/System');
const Sensor = require('../models/Sensor');
const AttributeSensorType = require('../models/AttributeSensorType');
const Attribute = require('../models/Attribute');

module.exports = {
    async showAll(req, res) {
        function findAttribute(attribute, list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i]._id == attribute) {
                    return i;
                }
            }
            return -1;
        }

        let systems = await System.find({ system_type_id: req.system_type_id });

        systemsInfo = []
        for (let i = 0; i < systems.length; i++) {
            const { _id, name } = systems[i];
            const sensors = await Sensor.find({ system_id: _id });

            systemInfo = { _id, name };

            systemInfo.attributes = [];
            for (let j = 0; j < sensors.length; j++) {
                const { _id, name, sensor_type_id } = sensors[j];
                const attributeSensorTypes = await AttributeSensorType.find({ sensor_type_id });

                for (let k = 0; k < attributeSensorTypes.length; k++) {
                    const { attribute_id } = attributeSensorTypes[k];
                    
                    attrIndex = findAttribute(attribute_id.toString(), systemInfo.attributes);
                    if (attrIndex == -1) {
                        attrIndex = systemInfo.attributes.length;
                        const { _id, name, unit } = await Attribute.findOne({ _id: attribute_id.toString() });
                        systemInfo.attributes.push({ _id: _id.toString(), name, unit, sensors: [] });
                    }
                            
                    systemInfo.attributes[attrIndex].sensors.push({ _id: _id.toString(), name });
                }
            }

            systemsInfo.push(systemInfo);
        }
        
        return res.json(systemsInfo);
    }
}