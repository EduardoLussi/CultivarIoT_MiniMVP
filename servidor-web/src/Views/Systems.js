import { Component } from 'react'

import api from '../api'

import System from './System'

import './Systems.css'

class Systems extends Component {
    state = {
        systems: []
    }

    async componentDidMount() {
        const res = await api.get('systems', {
            headers: {
                system_type_id: this.props.systemType._id
            }
        })
        this.setState({ systems: res.data })
    }

    render() {
        return (
            <div className="systems">
                <ul className="systemsList">
                    {this.state.systems.map(system => (
                        <li>
                            <System system={system} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Systems;