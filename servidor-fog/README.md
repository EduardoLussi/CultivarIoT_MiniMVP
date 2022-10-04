# Node.js server

This is a node.js server for attribute controls in IoT systems with sensor and actuators

# Routes

## GET /systemTypes

Used by the web server to get information about all types of systems in the environment.

Example of return:

```javascript
[
	{
		"_id": "62f6a67c9ea9b77db9933deb",
		"name": "Temperatura e Umidade"
	}
]
```

## GET /systems

Used by the web server to get information about all systems of a type.

Uses a `system_type` header with an id of the system type.

Example of return:

```javascript
[
	{
		"_id": "63123eb8dce431fb07b98447",
		"name": "Sistema 1-2",
		"attributes": [
			{
				"_id": "626fea1b9668ef298f120f7e",
				"name": "umidade",
				"unit": "%",
				"target_value": 84,
				"active": false,
				"sensors": [
					{
						"_id": "63123f72dce431fb07b9844c",
						"name": "S3"
					}
				]
			},
			...
		]
	},
	...
]
```

## POST /systems/attribute/target_value

Changes the desired value of an attribute control of a system.

Uses `system` and `attribute` headers identifying the system and the attributed referred.

The body contains the new target value for the system as follow:

```javascript
{
	"target_value": 85
}
```

## POST /systems/attribute/toggleControl

Turns ON or OFF an attribute control.

Uses `system` and `attribute` headers identifying the system and the attributed referred.

The body contains the information about if the control is going to be turned ON or OFF as follow:

```javascript
{
	"active": true
}
```

## POST /payload

Used by the sensors to send payloads.

Uses a `sensor_id` header to identify the sensor that sent the packet.

The body contains the payload as follow:

```javascript
{
	"payloadAttributes": [
		{
			"attribute_id": "626fea1b9668ef298f120f7e",
			"value": "84"
		},
		...
	]
}
```