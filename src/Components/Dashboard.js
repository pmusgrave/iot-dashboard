import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Device from '../Device.js';
import DeviceList from './DeviceList.js';
import SettingsPane from './SettingsPane.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        let init = new Device("Hello world");
        let lights = new Device("Lights");
        lights.color = {
            "R": 255,
            "G": 155,
            "B": 55,
        };
        let sensortag = new Device("Sensortag");

        this.state = {
            selected_device: init,
            devices: {}
        };

        this.state.devices[init.name] = init;
        this.state.devices[lights.name] = lights;
        this.state.devices[sensortag.name] = sensortag;
    }

    set_device(device_id) {
        this.setState({
            selected_device: this.state.devices[device_id]
        });
        console.log(device_id);
    }

    light_value_change (color, value){
        let new_devices = Object.assign({}, this.state.devices);
        new_devices["Lights"].color[color] = value;
        this.setState({
            devices: new_devices,
            selected_device: new_devices["Lights"],
        });
    }

    render() {
        return (
            <div>
                <DeviceList 
                    devices={this.state.devices} 
                    set_device={this.set_device.bind(this)}
                />
                <SettingsPane 
                    selected_device={this.state.selected_device}
                    light_value_change={this.light_value_change.bind(this)}
                />
            </div>
        );
    }
}

export default Dashboard;
