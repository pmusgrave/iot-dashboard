import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const request = require('browser-request');

let data = [];

class RunLogSettings extends Component {
  constructor(props) {
      super(props);

      let data = [];
      let options = {
        url: "/runs",
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
      <div className="runlog_settings">
          <h1>{this.props.selected_device.name}</h1>
            <table id="runs">
                <tr>
                    <td>Start Time</td>
                    <td>Distance (meters)</td>
                    <td>Duration</td>
                </tr>
                {this.state.data.map((list_item) => {
                    return <tr>
                        <td>{list_item.start_time.substring(0,list_item.start_time.indexOf("T"))}</td>
                        <td>{list_item.distance_m}</td>
                        <td>{list_item.duration}</td>
                    </tr>
                })}
            </table>
      </div>

    );
  }
}

export default RunLogSettings;
