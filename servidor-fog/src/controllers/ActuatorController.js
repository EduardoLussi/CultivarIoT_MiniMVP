const ActuatorSystemAttribute = require('../models/ActuatorSystemAttribute');
const Actuator = require('../models/Actuator');

const axios = require('axios');

module.exports = {
    async turn(on, system_attribute) {
        try {
            const actuatorsSystemAttribute = await ActuatorSystemAttribute.find({ system_attribute });
            
            let value;
            if (on) value = "on";
            else value = "off";

            for (let i = 0; i < actuatorsSystemAttribute.length; i++) {
                const { actuator } = actuatorsSystemAttribute[i];
                const { address } = await Actuator.findOne({ _id: actuator });

                axios.post(`http://${address}:8081/zeroconf/switch`, {
                    "data": {
                        "switch": value
                    }
                });
                
            }
        } catch (err) {
            console.log(err);
        }
    }
}