import React from "react";
import { Grid, Tab, TabPane } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";

export default class LawyerStats extends React.Component {
  render() {
    const { lawyers } = this.props;
    const lawyersNoIndex = lawyers.map(x => Object.keys(x));

    const panes = lawyersNoIndex
      .filter(x => x != "BRW" && x != "AMF")
      .map(x => {
        console.log(x)
        return {
          menuItem: x[0],
          render: () => (
            <TabPane style={{ height: "330px" }}>asdfasdfsadf</TabPane>
          )
        };
      });

    return <Tab panes={panes} />;
  }
}
