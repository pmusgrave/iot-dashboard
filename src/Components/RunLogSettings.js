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
          <ul id="runs">
                <li> <h1 id="menu_header">Run Data</h1></li>
                {Object.keys(this.state.data).map((list_item) => {
                    return <tr>
                        <li>
                            className="list_item" 
                        </li>
                    </tr>
                })}
            </ul>
      </div>
    );
  }
}

export default RunLogSettings;
