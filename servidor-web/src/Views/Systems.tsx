import { Component } from 'react'

import api from '../api'

import System from './System'

type SystemsProps = {
    systemType: {
        _id: string,
        name: string,
    }
}

class Systems extends Component<SystemsProps> {
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
            <div className="systemsTypes">
                {this.state.systems.map(system => {
                    return <System system={system} />
                })}
            </div>
        )
    }
}

export default Systems;