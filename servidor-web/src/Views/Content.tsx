import { Component } from 'react'

import api from '../api'

import Device from './Device'

import './Content.css'

import io from 'socket.io-client'

import menu from './img/menu.png'

class Content extends Component {
    state = {
        devices: [],
        device: { _id: "", name: "" },
        socketio: io("http://localhost:3333")
    }

    async componentDidMount() {
        const res = await api.get('devices')
        this.setState({ devices: res.data, device: res.data[0] })     
    }

    render() {
        return (
            <div className="page-content">
                <div className="side-menu">
                    <div className="side-menu-content">
                        <button><img src={menu}/></button>
                        <ul>
                            {this.state.devices.map(device => {
                                return (
                                    <li onClick={() => {this.setState({device})}}>
                                        <img src={`/src/Views/img/${device['name']}.png`} />
                                        <p>{device['name']}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="devices">
                    <Device device={this.state.device} socket={this.state.socketio} />
                </div>
            </div>
        )
    }
}

export default Content;