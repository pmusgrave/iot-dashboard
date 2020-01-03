import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SettingsPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.selected_device}</h1>
            </div>
        );
    }
}

export default SettingsPane;
