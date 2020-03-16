import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const colors = ["#8884d8", "#82ca9d", "#a222c2", "#ffaa23"];

export default class Graph extends PureComponent {
  render() {
    return (
      <LineChart
        width={1000}
        height={600}
        data={this.props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.props.data_cat.map((cat, index) => {
          return (
            <Line
              type="monotone"
              key={index}
              dataKey={cat}
              stroke={colors[index]}
            />
          );
        })}
      </LineChart>
    );
  }
}
