import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeviceList from './DeviceList.js';
import SettingsPane from './SettingsPane.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_device: "Hello World",
            devices: [{name:"lights"}, {name:"sensortag"}],
        };
    }

    set_device(device_id) {
        this.setState({selected_device:device_id});
        console.log(this.state.selected_device);
    }

    render() {
        return (
            <div>
                <DeviceList devices={this.state.devices} set_device={this.set_device.bind(this)}/>
                <SettingsPane selected_device={this.state.selected_device}/>
            </div>
        );
    }
}

export default Dashboard;
