import { Component } from 'react'

import io from 'socket.io-client'

import './System.css'

import Chart from './Chart'

import api from '../api'

type SystemProps = {
    system: {
        _id: string,
        name: string,
        attributes: Attribute[]
    }
}

type Sensor = {
    _id: string,
    name: string
}

type Attribute = {
    _id: string,
    name: string,
    unit: string,
    sensors: Sensor[]
}

type chartDatapoint = {
    x: string,
    y: number
}

type SystemState = {
    sensorsValues: {[key: string]: any},
    attributes: Attribute[],
    attribute: Attribute,
    from: string,
    to: string,
    chartData: chartDatapoint[]
}

class System extends Component<SystemProps, SystemState> {
    state: SystemState = {
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
            let sensorsValues: {[key: string]: any} = this.state.sensorsValues
            for (let i = 0; i < payloadAttributes.length; i++) {
                if (!sensorsValues[sensor_id]) {
                    sensorsValues[sensor_id] = {}
                }
                sensorsValues[sensor_id][payloadAttributes[i].attribute] = payloadAttributes[i].value
            }
            this.setState({ sensorsValues })
            console.log(sensorsValues)
        })
    }

    componentDidUpdate(prevProps: SystemProps, prevState: SystemState) {
        if (this.props.system != prevProps.system) {
            this.registerToSocket();
            this.updateSystem()
        }
        if (this.state.attribute != prevState.attribute || 
            this.state.from != prevState.from || 
            this.state.to != prevState.to) {
            // this.updateChart()
        }
    }

    async updateChart() {
        const res = await api.get("payload", {
            headers: {
                "system_type": this.props.system._id,
                "data_from": this.state.from,
                "data_to": this.state.to,
                "attribute": this.state.attribute._id
            }
        })
        this.setState({ chartData: res.data })
    }

    async updateSystem() {
        const res = await api.get("system", { headers: { "system_type_id": this.props.system._id } })
        this.setState({ attributes: res.data, attribute: res.data.length ? res.data[0] : {}, from: "", to: "" })
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

                {/* <div className="expand-data">
                    <div className="graph-container">
                        <div className="graph-content">
                            <div className="graph-attributes">
                                <ul>
                                    {this.state.attributes.map((attribute, i) => {
                                        return (
                                            <li key={i} onClick={() => { this.setState({attribute: attribute}) }}>
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
                                <p>From:</p>
                                <input type="datetime-local" step="1" onChange={e => this.setState({from: e.target.value})}/>
                            </div>
                            <div>
                                <p>To:</p>
                                <input type="datetime-local" step="1" onChange={e => this.setState({to: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div> 
        )
    }
}

export default System;