import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SettingsPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.selected_device.name == "lights") {
            return (
                <div>
                    <h1>{this.props.selected_device.name}</h1>
                    <h1>{this.props.selected_device.color}</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>{this.props.selected_device.name}</h1>
            </div>
        );
    }
}

export default SettingsPane;
