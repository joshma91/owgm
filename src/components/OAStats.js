import React from "react";
import { Grid } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label, LabelList } from "recharts";

export default class OAStats extends React.Component {
  render() {
    const { oaTimeByYear, nonOATimeByYear, grantTime} = this.props;

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p className="chartTitle">Average Time to First Office Action</p>
            <BarChart
              width={400}
              height={300}
              data={oaTimeByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year">
                <Label
                  value="Year"
                  offset={-5}
                  position="insideBottom"
                  style={{ fill: "slategrey" }}
                />
              </XAxis>
              <YAxis>
                <Label
                  value="Months"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey" }}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="months" barSize={30} fill="#8884d8">
                <LabelList
                  dataKey="months"
                  position="top"
                  style={{ fill: "slategrey" }}
                />
              </Bar>
            </BarChart>
          </Grid.Column>
          <Grid.Column>
          <p className="chartTitle">Average Time to Grant</p>
            <BarChart
              width={400}
              height={300}
              data={grantTime}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year">
                <Label
                  value="Year"
                  offset={-5}
                  position="insideBottom"
                  style={{ fill: "slategrey" }}
                />
              </XAxis>
              <YAxis>
                <Label
                  value="Months"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey" }}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="months" barSize={30} fill="#8884d8">
                <LabelList
                  dataKey="months"
                  position="top"
                  style={{ fill: "slategrey" }}
                />
              </Bar>
            </BarChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
