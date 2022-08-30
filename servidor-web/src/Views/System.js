import { Component } from 'react'

import io from 'socket.io-client'

import './System.css'

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
            sensors: []
        },
        from: "",
        to: "",
        chartData: []
    }

    registerToSocket = () => {
        const socket = io("http://localhost:3333")
        socket.on(`payload${this.props.system._id}`, payload => {
            let { payloadAttributes, sensor_id } = payload;
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
        if (this.props.system != prevProps.system) {
            this.registerToSocket();
            this.updateSystem()
        }
        if (this.state.attribute != prevState.attribute || 
            this.state.from != prevState.from || 
            this.state.to != prevState.to) {
            this.updateChart()
        }
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
        console.log(res.data)
        this.setState({ chartData: res.data })
    }

    updateSystem() {
        this.setState({ attributes: this.props.system.attributes, 
                        attribute: this.props.system.attributes[0], 
                        from: "", to: "" })
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
                                        <p>{i+1}- {attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}</p>
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
                                                {i+1}<span>{i+1} - {attribute.name}</span>                
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