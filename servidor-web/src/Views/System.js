import { Component } from 'react'

import io from 'socket.io-client'

import './System.css'

import Switch from '@mui/material/Switch'

import Chart from './Chart'

import api from '../api'

class System extends Component {
    state = {
        sensorsValues: {},
        attributes: [],
        attribute: {
            _id: "",
            name: "",
            unit: "",
            target: 0,
            sensors: []
        },
        from: "",
        to: "",
        chartData: []
    }

    registerToSocket = () => {
        console.log(`payload${this.props.system._id}`)
        const socket = io("http://localhost:3333")
        socket.on(`payload${this.props.system._id}`, payload => {
            let { payloadAttributes, sensor_id } = payload
            let sensorsValues = this.state.sensorsValues
            for (let i = 0; i < payloadAttributes.length; i++) {
                if (!sensorsValues[sensor_id]) {
                    sensorsValues[sensor_id] = {}
                }
                sensorsValues[sensor_id][payloadAttributes[i].attribute_id] = payloadAttributes[i].value
            }
            this.setState({ sensorsValues })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.system !== prevProps.system) {
            this.registerToSocket()
            this.updateSystem()
        }
        if (this.state.attribute !== prevState.attribute || 
            this.state.from !== prevState.from || 
            this.state.to !== prevState.to) {
            this.updateChart()
        }
    }

    async componentDidMount() {
        this.updateSystem()
    }

    async updateChart() {
        const res = await api.get("payload", {
            headers: {
                "system_id": this.props.system._id,
                "data_from": this.state.from,
                "data_to": this.state.to,
                "attribute_id": this.state.attribute._id
            }
        })
        this.setState({ chartData: res.data })
    }

    async changeTarget(attribute_index, value) {
        const { _id, target_value } = this.state.attributes[attribute_index]
        const res = await api.post("systems/attribute/target_value", 
            { 
                "target_value": target_value + value 
            },
            {
                headers: {
                    "system": this.props.system._id,
                    "attribute": _id,
                }
            }
        );
        if (res.data.target_value) {
            this.setState(prevState => ({
                attributes: prevState.attributes.map((attribute, i) =>
                    i === attribute_index ? { ...attribute, target_value: res.data.target_value } : attribute
                )
            }))
        }
    }

    updateSystem() {
        this.setState({ attributes: this.props.system.attributes, 
                        attribute: this.props.system.attributes[0], 
                        from: "", to: "" })
    }

    async toggleAttributeControl(attribute_index) {
        const { _id, active } = this.state.attributes[attribute_index]
        const res = await api.post("systems/attribute/toggleControl", 
            { 
                "active": !active
            },
            {
                headers: {
                    "system": this.props.system._id,
                    "attribute": _id,
                }
            }
        );
        if (res.data) {
            this.setState(prevState => ({
                attributes: prevState.attributes.map((attribute, i) =>
                    i === attribute_index ? { ...attribute, active: res.data.active } : attribute
                )
            }))
        }
    }

    render() {
        return (
            <div className="system">
                <div className="system-content">
                    <div className="system-title">
                        <h1>{this.props.system.name}</h1>
                    </div>
                    <div className="system-attributes">
                        <ul className="system-attributes">
                            {this.props.system.attributes.map((attribute, i) => {
                                return (
                                    <li>
                                        <div>
                                            <p>{i+1}- {attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}</p>
                                            <Switch 
                                                className='system-attributes-switch' 
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                checked={this.state.attributes.length ? this.state.attributes[i].active : false}
                                                onChange={() => this.toggleAttributeControl(i)}
                                            />
                                        </div>
                                        <ul className="system-attribute-sensors">
                                            {attribute.sensors.map(sensor => {
                                                return (
                                                    <li className="system-attribute-sensors-value">
                                                        <p>
                                                            {sensor.name}:
                                                        </p>
                                                        <p>
                                                            {this.state.sensorsValues[sensor._id] ? this.state.sensorsValues[sensor._id][attribute._id] : ''} {attribute.unit} 
                                                        </p>
                                                    </li>
                                                )
                                            })}
                                            <li className="system-attribute-sensors-value">
                                                <p>
                                                    Desejável:
                                                </p>
                                                <div className="attribute-input">
                                                    <button className="attribute-input-less" onClick={() => this.changeTarget(i, -1)}>-</button>
                                                    <input type="number" min="60" max="80" value={this.state.attributes.length ? this.state.attributes[i].target_value : ""}/>
                                                    <button className="attribute-input-more" onClick={() => this.changeTarget(i, 1)}>+</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="expand-data">
                    <div className="graph-container">
                        <div className="graph-content">
                            <div className="graph-attributes">
                                <ul>
                                    {this.state.attributes.map((attribute, i) => {
                                        return (
                                            <li key={i} onClick={() => { this.setState({ attribute: attribute }) }}>
                                                {i+1}
                                                <span>{i+1} - {attribute.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="graph">
                                <h1 className="graph-title">{this.state.attribute.name}</h1>
                                <Chart attribute={this.state.attribute} data={this.state.chartData} />
                            </div>
                        </div>
                    </div>
                    <div className="graph-search">
                        <div className="from-to">
                            <div>
                                <p>De:</p>
                                <input type="datetime-local" step="1" onChange={e => this.setState({from: e.target.value})}/>
                            </div>
                            <div>
                                <p>Até:</p>
                                <input type="datetime-local" step="1" onChange={e => this.setState({to: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default System;