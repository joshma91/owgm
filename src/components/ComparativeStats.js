import React from "react";
import { Grid } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";

export default class OAStats extends React.Component {
  render() {

    const {firstOACompare} = this.props
    console.log("firstOACompare: ", firstOACompare)
    return (  
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p className="chartTitle">
              Average Time to First Office Action: PPH vs non-PPH
            </p>
            <BarChart
              width={400}
              height={300}
              data={firstOACompare}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar type="monotone" dataKey="averageTime" barSize={30} fill="#8884d8" />
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
