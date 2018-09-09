import React from "react";
import { Grid } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";

export default class FirmStats extends React.Component {
  render() {

    const {grantedByYear, appliedByYear} = this.props

    return (  
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p style={{ float: "left", fontSize: "large" }}>
              Number of Granted PPH Applications
            </p>
            <BarChart
              width={400}
              height={300}
              data={grantedByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar type="monotone" dataKey="num" barSize={30} fill="#8884d8" />
            </BarChart>
          </Grid.Column>
          <Grid.Column>
            <p style={{ float: "left", fontSize: "large" }}>
              Number of PPH Applications
            </p>
            <BarChart
              width={400}
              height={300}
              data={appliedByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year" />
              <YAxis />
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
