import React from "react";
import { Grid } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label, LabelList } from "recharts";

export default class OAStats extends React.Component {
  render() {

    const {firstOACompare, grantRate, instantRate} = this.props
    return (  
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <p className="chartTitle">
              Average Time to First Office Action
            </p>
            <BarChart
              width={300}
              height={300}
              data={firstOACompare}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="type" />
              <YAxis>
                <Label
                  value="Months"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey"}}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="averageTime" barSize={30} fill="#8884d8">
                <LabelList dataKey="averageTime" position="top" style={{fill: "slategrey"}} />
              </Bar>
            </BarChart>
          </Grid.Column>
          <Grid.Column>
            <p className="chartTitle">
              Grant Rate
            </p>
            <BarChart
              width={300}
              height={300}
              data={grantRate}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="type" />
              <YAxis>
                <Label
                  value="Rate"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey"}}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="grantRate" barSize={30} fill="#8884d8">
                <LabelList dataKey="grantRate" position="top" style={{fill: "slategrey"}} />
              </Bar>
            </BarChart>
          </Grid.Column>
          <Grid.Column>
            <p className="chartTitle">
              Grant Rate Without Office Action
            </p>
            <BarChart
            domain={[0, 1]}
              width={300}
              height={300}
              data={instantRate}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="type" />
              <YAxis>
                <Label
                  value="Rate"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey"}}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="instantRate" barSize={30} fill="#8884d8">
                <LabelList dataKey="instantRate" position="top" style={{fill: "slategrey"}} />
              </Bar>
            </BarChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
