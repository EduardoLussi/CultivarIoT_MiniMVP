import { Component } from 'react'

import './Device.css'

import Chart from './Chart'

import api from '../api'

type DeviceProps = {
    device: {
        _id: string,
        name: string,
    }
}

type Attribute = {
    _id: string
    name: string
    unit: string
}

type chartDatapoint = {
    x: string,
    y: number
}

type DeviceState = {
    attributes: Attribute[],
    attribute: Attribute,
    from: string,
    to: string,
    chartData: chartDatapoint[]
}

class Device extends Component<DeviceProps, DeviceState> {
    state: DeviceState = {
        attributes: [],
        attribute: {
            _id: "",
            name: "",
            unit: ""
        },
        from: "",
        to: "",
        chartData: []
    }

    componentDidUpdate(prevProps: DeviceProps, prevState: DeviceState) {
        if (this.props.device != prevProps.device) {
            this.updateDevice()
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
                "device_type": this.props.device._id,
                "data_from": this.state.from,
                "data_to": this.state.to,
                "attribute": this.state.attribute._id
            }
        })
        this.setState({ chartData: res.data })
    }

    async updateDevice() {
        const res = await api.get("device", { headers: { "device_type_id": this.props.device._id } })
        this.setState({ attributes: res.data, attribute: res.data.length ? res.data[0] : {}, from: "", to: "" })
    }

    render() {
        return (
            <div className="device">
                <div className="device-content">
                    <div className="device-title">
                        <img src={`/src/Views/img/${this.props.device.name}.png`}/>
                        <h1>{this.props.device.name}</h1>
                    </div>
                    <div className="device-systems">
                        <ul className="device-systems">
                            <li>
                                <ul className="device-system">
                                    {this.state.attributes.map((attribute, i) => {
                                        return (
                                            <li>
                                                <p>
                                                    {i+1}- {attribute.name}
                                                </p>
                                            </li>
                                        )
                                    })}    
                                    {/* <li className="device-system-value">
                                        <p>
                                            Sensor:
                                        </p>
                                        <p>
                                            77%
                                        </p>
                                    </li> */}
                                </ul>
                            </li>
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
                </div>
            </div> 
        )
    }
}

export default Device;