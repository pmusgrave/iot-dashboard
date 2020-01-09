import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: this.props.devices,
            selected_device: this.props.selected_devce,
        };
    }

    set_device(device_id) {
        this.props.set_device(device_id);
    }

    render() {
        return (
            <div id="menuToggle" className="device_list">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    <li> <h1>Devices</h1></li>
                    {Object.keys(this.state.devices).map((list_item) => {
                        return <tr>
                            <li><button 
                                className="list_item" 
                                onClick={() => {this.set_device(list_item)}}>{list_item}
                            </button></li>
                        </tr>
                    })}
                </ul>
            </div>
        );
    }
}

export default DeviceList;
