import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class LightsSettings extends Component {
    constructor(props) {
        super(props);
    }

    value_change(color, value) {
        this.props.light_value_change(color,value);
    }

    render() {
        return (
            <div className="lights_settings">
                <h1>{this.props.selected_device.name}</h1>
                <hr/>
                {this.props.selected_device.color["R"]}
                <Slider 
                    value={this.props.selected_device.color["R"]}
                    max={255}
                    onChange={this.value_change.bind(this,"R")}
                    onAfterChange={this.props.light_value_change_complete}
                />
                {this.props.selected_device.color["G"]}
                <Slider 
                    value={this.props.selected_device.color["G"]}
                    max={255}
                    onChange={this.value_change.bind(this,"G")}
                />
                {this.props.selected_device.color["B"]}
                <Slider 
                    value={this.props.selected_device.color["B"]}
                    max={255}
                    onChange={this.value_change.bind(this,"B")}
                />
            </div>
        );
    }
}

export default LightsSettings;
