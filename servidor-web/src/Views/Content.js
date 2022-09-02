import { Component } from 'react'

import api from '../api'

import Systems from './Systems'

import './Content.css'

import menu from './img/menu.png'

class Content extends Component {
    state = {
        systemTypes: [],
        systemType: { _id: "", name: "" }
    }

    async componentDidMount() {
        const res = await api.get('systemTypes')
        this.setState({ systemTypes: res.data, systemType: res.data[0] })
    }

    render() {
        return (
            <div className="page-content">
                <div className="side-menu">
                    <div className="side-menu-content">
                        <button><img src={menu} alt='menu'/></button>
                        <ul>
                            {this.state.systemTypes.map(systemType => {
                                return (
                                    <li onClick={() => {this.setState({ systemType })}}>
                                        <img src={require(`/src/Views/img/${systemType['name']}.png`)} alt={systemType['name']} />
                                        <p>{systemType['name']}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Systems systemType={this.state.systemType}/>
            </div>
        )
    }
}

export default Content;