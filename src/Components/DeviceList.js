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
            <div>
                <table>
                {Object.keys(this.state.devices).map((list_item) => {
                    return <tr>
                        <td><button onClick={() => {this.set_device(list_item)}}>{list_item}</button></td>
                        </tr>
                    })}
                <tr>
            </tr>
          </table>
            </div>
        );
    }
}

export default DeviceList;
