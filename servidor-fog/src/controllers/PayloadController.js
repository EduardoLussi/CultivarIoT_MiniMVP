const Payload = require('../models/Payload');
const PayloadAttribute = require('../models/PayloadAttribute');

function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({length: num}, (_, i) => start + step * i);
}

module.exports = {
    async store(req, res) {
        const { device_type } = req.headers;

        let payload = await Payload.create({ device_type });

        const { payloadAttributes } = req.body;

        for (let i = 0; i < payloadAttributes.length; i++) {
            const { attribute, value } = payloadAttributes[i];
            await PayloadAttribute.create({ attribute, payload: payload._id, value });
        }

        req.io.emit(`payload${device_type}`, payloadAttributes);

        return res.json(payload);
    },

    async show(req, res) {
        const { device_type, attribute } = req.headers;
        let { data_from, data_to } = req.headers;

        if (data_from) data_from += "-03:00";
        if (data_to) data_to += "-03:00";

        const payloads = await Payload.find({ device_type_id: device_type, 
                                              data: { 
                                                $gte: data_from, 
                                                $lte: data_to
                                              } 
                                            });

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