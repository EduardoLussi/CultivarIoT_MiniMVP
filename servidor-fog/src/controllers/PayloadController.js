const Payload = require('../models/Payload');
const Sensor = require('../models/Sensor');
const PayloadAttribute = require('../models/PayloadAttribute');

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

        return res.json(payload);
    },

    async show(req, res) {
        const { device_type, data_from, data_to, attribute } = req.headers;

        const payloads = await Payload.find({ device_type_id: device_type, data: { $gte: data_from, $lte: data_to } });

        let payloads_values = [];

        let samples
        if (payloads.length > 100)
            samples = linspace(0, payloads.length-1, 100)
        else
            samples = linspace(0, payloads.length-1, payloads.length)
        
        for (let i = 0; i < samples.length; i++) {
            const { _id, data } = payloads[Math.round(samples[i])];

            const { value } = await PayloadAttribute.findOne({ payload: _id, attribute });

            payloads_values.push({ x: data, y: value });
        }

        return res.json(payloads_values);
    }
}