const DeviceType = require('../models/DeviceType');
const PDUAttribute = require('../models/PDUAttribute');
const Attribute = require('../models/Attribute');

module.exports = {
    async showAll(req, res) {
        const devices = await DeviceType.find();
        
        let device_ids = [];

        for (let i = 0; i < devices.length; i++) {
            const { _id, name } = devices[i];
            device_ids.push({ _id, name });
        }

        return res.json(device_ids);
    },

    async show(req, res) {
        const { device_type_id } = req.headers;

        const pduAttributes = await PDUAttribute.find({ device_type_id: device_type_id });

        let attributes = [];

        for (let i = 0; i < pduAttributes.length; i++) {
            const { _id, name, unit } = await Attribute.findOne({ _id: pduAttributes[i]['attribute_id'].toString() });
            attributes.push({ _id, name, unit });
        }

        return res.json(attributes);
    }
}