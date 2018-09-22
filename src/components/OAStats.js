import React from "react";
import { Grid } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";

export default class OAStats extends React.Component {
  render() {

    const {oaTimeByYear} = this.props

    return (  
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p class="chartTitle">
              Average Time to First Office Action
            </p>
            <BarChart
              width={400}
              height={300}
              data={oaTimeByYear}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar type="monotone" dataKey="months" barSize={30} fill="#8884d8" />
            </BarChart>
          </Grid.Column>
          <Grid.Column>
            <p class="chartTitle">
              Applications Receiving Immediate Grant
            </p>
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
