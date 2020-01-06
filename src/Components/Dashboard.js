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
            "G": 255,
            "B": 255,
        }
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
        this.setState({selected_device:this.state.devices[device_id]});
        console.log(device_id);
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
