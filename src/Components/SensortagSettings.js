import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';

const request = require('browser-request');

let data = [];

class SensortagSettings extends Component {
  constructor(props) {
      super(props);

      let data = [];
      let options = {
        url: "/temp",
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };

      request.get(options, (error, response, body) => {
        if(error)
          throw error;
        console.log(body);
        data = JSON.parse(body);
        this.setState({
          data: data
        });
      });

      this.state = {
        data: data,
      }
  }

  render() {
    return (
      <div>
          <h1>{this.props.selected_device.name}</h1>
          <LineChart
            width={400}
            height={400}
            data={this.state.data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
              <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          </LineChart>
      </div>
    );
  }
}

export default SensortagSettings;
