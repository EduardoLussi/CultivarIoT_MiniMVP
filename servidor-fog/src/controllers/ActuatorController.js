/**
 * Controller for Actuator
 */

// Import schemas
const ActuatorSystemAttribute = require('../models/ActuatorSystemAttribute');
const Actuator = require('../models/Actuator');

// Import axios
const axios = require('axios');

module.exports = {
    /**
     * Turns ON or OFF Actuators that controls an Attribute
     * @param {Boolean} on 
     * @param {_id} system_attribute 
     */
    async turn(on, system_attribute) {
        try {
            // Get all Actuators that controls an Attribute by system_attribute control
            const actuatorsSystemAttribute = await ActuatorSystemAttribute.find({ system_attribute });
            
            let value;
            if (on) value = "on";
            else value = "off";

            // Turn ON or OFF all the actuators
            for (let i = 0; i < actuatorsSystemAttribute.length; i++) {
                // Get Actuator address
                const { actuator } = actuatorsSystemAttribute[i];
                const { address } = await Actuator.findOne({ _id: actuator });

                // Turn ON or OFF the Actuator by a HTTP POST request to it
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