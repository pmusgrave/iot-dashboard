import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LightsSettings  from './LightsSettings.js';
import SensortagSettings from './SensortagSettings.js';

class SettingsPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.selected_device.name == "Lights") {
            return (
                <LightsSettings 
                    selected_device={this.props.selected_device}
                    light_value_change={this.props.light_value_change}
                />
            );
        }
        else if (this.props.selected_device.name == "Sensortag") {
            return (
                <SensortagSettings 
                    selected_device={this.props.selected_device}
                />
            );
        }
        else {
            return (
                <div>
                    <h1>{this.props.selected_device.name}</h1>
                </div>
            );
        }
    }
}

export default SettingsPane;
