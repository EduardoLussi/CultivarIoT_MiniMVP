/**
 * Controller for Payload
 */

// Import schemas
const Payload = require('../models/Payload');
const Sensor = require('../models/Sensor');
const PayloadAttribute = require('../models/PayloadAttribute');
const SystemAttribute = require('../models/SystemAttribute');
const SystemTypeAttribute = require('../models/SystemTypeAttribute');
const System = require('../models/System');
const SensorSystemAttribute = require('../models/SensorSystemAttribute');

// Import other controllers
const ActuatorController = require('./ActuatorController');

function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({length: num}, (_, i) => start + step * i);
}

module.exports = {
    /**
     * Stores a Payload received by a Sensor
     */
    async store(req, res) {
        // Get sensor_id from HTTP packet header
        const { sensor_id } = req.headers;

        // Creates a Payload
        let payload = await Payload.create({ sensor: sensor_id });

        // Get the values of the Payload from HTTP packet body
        const { payloadAttributes } = req.body;

        // Creates PayloadAttribute for all the Attributes readed by the Sensor
        for (let i = 0; i < payloadAttributes.length; i++) {
            // Get Attribute _id and value readed
            const { attribute_id, value } = payloadAttributes[i];
            // Creates PayloadAttribute
            await PayloadAttribute.create({ attribute: attribute_id, payload: payload._id, value });
        }

        // Sends Payload to websockets
        const { system_attribute } = await SensorSystemAttribute.findOne({ sensor: sensor_id });
        const { system } = await SystemAttribute.findOne({ _id: system_attribute });
        req.io.emit(`payload${system}`, { payloadAttributes, sensor_id });

        // Checks the necessity of turning ON or OFF the Actuators
        // const sensorSystemAttributes = await SensorSystemAttribute.find({ sensor: sensor_id }); // Get all Systems controls related to the Sensor
        // for (let i = 0; i < sensorSystemAttributes.length; i++) {
        //     // Get informations about the System control over the Attribute
        //     const { active, target_value, system_type_attribute } = await SystemAttribute.findOne({ _id: sensorSystemAttributes[i].system_attribute });
        //     if (active) {   // If the Attribute is being controlled
        //         const { attribute, actuator_increase } = await SystemTypeAttribute.findOne({ _id: system_type_attribute });
        //         // Verifies if the value readed by the Sensor is above or below the desired for the SystemAttribute
        //         for (let j = 0; j < payloadAttributes.length; j++) {
        //             const { attribute_id, value } = payloadAttributes[j];
                    
        //             if (attribute == attribute_id) {
        //                 if (value > target_value) {
        //                     if (actuator_increase) ActuatorController.turn(false, system_attribute);
        //                     else ActuatorController.turn(true, system_attribute);
        //                 } else if (value < target_value) {
        //                     if (!actuator_increase) ActuatorController.turn(false, system_attribute);
        //                     else ActuatorController.turn(true, system_attribute);
        //                 }
        //                 break;
        //             }
        //         }    
        //     }
        // }

        return res.json(payload);
    },

    /**
     * Returns Payloads of attribute_id in system_id from data_from to data_to
     */
    async show(req, res) {
        // Get headers
        const { system_id, attribute_id } = req.headers;
        let { data_from, data_to } = req.headers;
        if (data_from) data_from += "-03:00";
        if (data_to) data_to += "-03:00";

        // Get SystemType of the System
        const { system_type } = await System.findOne({ _id: system_id });
        // Get control of the SystemType over the Attribute
        const { _id: system_type_attribute } = await SystemTypeAttribute.findOne({ attribute: attribute_id, system_type });
        // Get control of System over the Attribute
        const { _id: system_attribute } = await SystemAttribute.findOne({ system: system_id, system_type_attribute });

        // Get all Sensors related to the Attribute control by the System
        const sensor_system_attributes = await SensorSystemAttribute.find({ system_attribute });
        let sensors = [];
        for (let i = 0; i < sensor_system_attributes.length; i++) {
            sensors.push.apply(sensors, await Sensor.find({ _id: sensor_system_attributes[i].sensor }));
        }

        // Get the maximum of 100 Payloads from date_from to date_to
        let payloads = [];
        for (let i = 0; i < sensors.length; i++) {
            // Finds all Payloads of the Sensor in the desired date
            const sensorPayloads = await Payload.find({ sensor: sensors[i]._id, 
                                                        date: { $gte: data_from, $lte: data_to } });
            
            // Filter a maximum of 100 Payloads
            let samples = [];
            if (sensorPayloads.length > 100)
                samples = linspace(0, sensorPayloads.length-1, 100);
            else if (sensorPayloads.length == 1)
                samples = [0];
            else
                samples = linspace(0, sensorPayloads.length-1, sensorPayloads.length);
            
            // Get Attribute values of the Payloads
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