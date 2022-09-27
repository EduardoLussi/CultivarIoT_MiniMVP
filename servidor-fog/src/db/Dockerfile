FROM mongo:4.2.23-rc1

COPY systems.json /systems.json
COPY system_types.json /system_types.json
COPY system_type_attributes.json /system_type_attributes.json
COPY system_attributes.json /system_attributes.json
COPY sensors.json /sensors.json
COPY sensor_types.json /sensor_types.json
COPY sensor_system_attributes.json /sensor_system_attributes.json
COPY attributes.json /attributes.json
COPY attribute_sensor_types.json /attribute_sensor_types.json
COPY actuators.json /actuators.json
COPY actuator_types.json /actuator_types.json
COPY actuator_system_attributes.json /actuator_system_attributes.json

CMD mongoimport --host db --db CultivarIoT --collection systems --drop --file /systems.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection system_types --drop --file /system_types.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection system_type_attributes --drop --file /system_type_attributes.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection system_attributes --drop --file /system_attributes.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection sensors --drop --file /sensors.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection sensor_types --drop --file /sensor_types.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection sensor_system_attributes --drop --file /sensor_system_attributes.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection attributes --drop --file /attributes.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection attribute_sensor_types --drop --file /attribute_sensor_types.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection actuators --drop --file /actuators.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection actuator_types --drop --file /actuator_types.json --jsonArray && \
    mongoimport --host db --db CultivarIoT --collection actuator_system_attributes --drop --file /actuator_system_attributes.json --jsonArray