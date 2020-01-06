import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SensortagSettings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                <h1>{this.props.selected_device.name}</h1>
                </div>
        );
    }
}

export default SensortagSettings;
