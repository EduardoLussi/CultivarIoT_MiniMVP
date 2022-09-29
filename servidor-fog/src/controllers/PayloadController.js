const Payload = require('../models/Payload');
const Sensor = require('../models/Sensor');
const PayloadAttribute = require('../models/PayloadAttribute');
const SystemAttribute = require('../models/SystemAttribute');
const SystemTypeAttribute = require('../models/SystemTypeAttribute');
const System = require('../models/System');
const SensorSystemAttribute = require('../models/SensorSystemAttribute');

const ActuatorController = require('./ActuatorController');

function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({length: num}, (_, i) => start + step * i);
}

module.exports = {
    async store(req, res) {
        const { sensor_id } = req.headers;

        let payload = await Payload.create({ sensor: sensor_id });

        const { payloadAttributes } = req.body;

        for (let i = 0; i < payloadAttributes.length; i++) {
            const { attribute_id, value } = payloadAttributes[i];
            await PayloadAttribute.create({ attribute: attribute_id, payload: payload._id, value });
        }

        const { system_attribute } = await SensorSystemAttribute.findOne({ sensor: sensor_id });
        const { system } = await SystemAttribute.findOne({ _id: system_attribute });
        req.io.emit(`payload${system}`, { payloadAttributes, sensor_id });

        const sensorSystemAttributes = await SensorSystemAttribute.find({ sensor: sensor_id });
        for (let i = 0; i < sensorSystemAttributes.length; i++) {
            const { active, target_value, system_type_attribute } = await SystemAttribute.findOne({ _id: sensorSystemAttributes[i].system_attribute });
            if (active) {
                const { attribute, actuator_increase } = await SystemTypeAttribute.findOne({ _id: system_type_attribute });
                for (let j = 0; j < payloadAttributes.length; j++) {
                    const { attribute_id, value } = payloadAttributes[j];
                    
                    if (attribute == attribute_id) {
                        if (value > target_value) {
                            if (actuator_increase) ActuatorController.turn(false, system_attribute);
                            else ActuatorController.turn(true, system_attribute);
                        } else if (value < target_value) {
                            if (!actuator_increase) ActuatorController.turn(false, system_attribute);
                            else ActuatorController.turn(true, system_attribute);
                        }
                    }
                }    
            }
        }

        return res.json(payload);
    },

    async show(req, res) {
        const { system_id, attribute_id } = req.headers;
        let { data_from, data_to } = req.headers;

        if (data_from) data_from += "-03:00";
        if (data_to) data_to += "-03:00";

        const { system_type } = await System.findOne({ _id: system_id });
        const { _id: system_type_attribute } = await SystemTypeAttribute.findOne({ attribute: attribute_id, system_type });

        const { _id: system_attribute } = await SystemAttribute.findOne({ system: system_id, system_type_attribute });

        const sensor_system_attributes = await SensorSystemAttribute.find({ system_attribute });
        let sensors = [];
        for (let i = 0; i < sensor_system_attributes.length; i++) {
            sensors.push.apply(sensors, await Sensor.find({ _id: sensor_system_attributes[i].sensor }));
        }

        let payloads = [];
        for (let i = 0; i < sensors.length; i++) {
            const sensorPayloads = await Payload.find({ sensor: sensors[i]._id, 
                                                        date: { $gte: data_from, $lte: data_to } });
            
            let samples = [];
            if (sensorPayloads.length > 100)
                samples = linspace(0, sensorPayloads.length-1, 100);
            else if (sensorPayloads.length == 1)
                samples = [0];
            else
                samples = linspace(0, sensorPayloads.length-1, sensorPayloads.length);
            
            let sensorPayloadsValues = [];
            for (let j = 0; j < samples.length; j++) {
                const { _id, date } = sensorPayloads[Math.round(samples[j])];
    
                const { value } = await PayloadAttribute.findOne({ payload: _id, attribute: attribute_id });
    
                sensorPayloadsValues.push({ x: date, y: value });
            }

            payloads.push({ sensor: sensors[i], payloads: sensorPayloadsValues });
        }

        return res.json(payloads);
    }
}