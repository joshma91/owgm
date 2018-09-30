import React from "react";
import { Grid } from "semantic-ui-react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Label,
  LabelList
} from "recharts";

export default class OrdinaryStats extends React.Component {
  render() {
    const { ordGrantedByYear, ordAppliedByYear } = this.props;

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p className="chartTitle">Number of Granted PPH Applications</p>
            <BarChart
              width={400}
              height={300}
              data={ordGrantedByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year">
                <Label value="Year" offset={-5} position="insideBottom" style={{fill: "slategrey"}} />
              </XAxis>
              <YAxis>
                <Label
                  value="# Granted Applications"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey" }}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="num" barSize={30} fill="#8884d8">
                <LabelList dataKey="num" position="top" style={{fill: "slategrey"}} />
              </Bar>
            </BarChart>
          </Grid.Column>
          <Grid.Column>
            <p className="chartTitle">Number of PPH Applications</p>
            <BarChart
              width={400}
              height={300}
              data={ordAppliedByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year">
                <Label value="Year" offset={-5} position="insideBottom" style={{fill: "slategrey"}}/>
              </XAxis>
              <YAxis>
                <Label
                  value="# Applications"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey"}}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar
                type="monotone"
                dataKey="numPCT"
                barSize={30}
                fill="#8884d8"
              />
              <Bar
                type="monotone"
                dataKey="numNonPCT"
                barSize={30}
                fill="#82ca9d"
              />
            </BarChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
