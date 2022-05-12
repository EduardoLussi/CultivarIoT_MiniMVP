const Payload = require('../models/Payload');
const PayloadAttribute = require('../models/PayloadAttribute');
const Attribute = require('../models/Attribute');

module.exports = {
    async store(req, res) {
        const { device_type } = req.headers;

        let payload = await Payload.create({ device_type });

        const { payloadAttributes } = req.body;

        for (let i = 0; i < payloadAttributes.length; i++) {
            const { attribute, value } = payloadAttributes[i];
            await PayloadAttribute.create({ attribute, payload: payload._id, value });
        }

        return res.json(payload);
    },

    async show(req, res) {
        const { device_type, data_from, data_to } = req.headers;

        const payloads = await Payload.find({ device_type_id: device_type, data: { $gte: data_from, $lte: data_to } });

        let payloads_values = [];

        for (let i = 0; i < payloads.length; i++) {
            const { _id, data } = payloads[i];

            const payloadAttributes = await PayloadAttribute.find({ payload: _id });
            
            let payload_attributes_values = [];
            for (let j = 0; j < payloadAttributes.length; j++) {
                const { attribute, value } = payloadAttributes[j];

                const { name, unit } = await Attribute.findById(attribute.toString());

                payload_attributes_values.push({ name, unit, value });
            }

            payloads_values.push({ data, values: payload_attributes_values });
        }

        return res.json(payloads_values);
    }
}