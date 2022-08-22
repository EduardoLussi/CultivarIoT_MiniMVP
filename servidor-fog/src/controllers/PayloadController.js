const Payload = require('../models/Payload');
const Sensor = require('../models/Sensor');
const PayloadAttribute = require('../models/PayloadAttribute');
const SensorType = require('../models/SensorType');

function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({length: num}, (_, i) => start + step * i);
}

module.exports = {
    async store(req, res) {
        const { sensor_id } = req.headers;

        let payload = await Payload.create({ sensor_id });

        const { payloadAttributes } = req.body;

        for (let i = 0; i < payloadAttributes.length; i++) {
            const { attribute_id, value } = payloadAttributes[i];
            await PayloadAttribute.create({ attribute_id, payload_id: payload._id, value });
        }

        const { system_id } = await Sensor.findOne({ _id: sensor_id });
        req.io.emit(`payload${system_id}`, { payloadAttributes, sensor_id });
        console.log(payloadAttributes)
        return res.json(payload);
    },

    async show(req, res) {
        const { system_id, data_from, data_to, attribute_id } = req.headers;

        const sensor_types = await SensorType.find({ attribute_id });

        let sensors = [];
        for (let i = 0; i < sensor_types.length; i++) {
            sensors.push.apply(sensors, await Sensor.find({ sensor_type_id: sensor_types[i]._id,
                                                            system_id }));
        }

        let payloads = [];
        for (let i = 0; i < sensors.length; i++) {
            const sensorPayloads = await Payload.find({ sensor_id: sensors[i]._id, 
                                                        data: { $gte: data_from, $lte: data_to } });
            
            let samples
            if (payloads.length > 100)
                samples = linspace(0, sensorPayloads.length-1, 100);
            else
                samples = linspace(0, sensorPayloads.length-1, sensorPayloads.length);
            
            let sensorPayloadsValues = [];
            for (let j = 0; j < samples.length; j++) {
                const { _id, data } = sensorPayloads[Math.round(samples[j])];
    
                const { value } = await PayloadAttribute.findOne({ payload_id: _id, attribute_id });
    
                sensorPayloadsValues.push({ x: data, y: value });
            }

            payloads.push({ sensor: sensors[i], payloads: sensorPayloadsValues });
        }

        return res.json(payloads);
    }
}