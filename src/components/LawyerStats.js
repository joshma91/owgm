import React from "react";
import { Grid, Tab } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";

export default class LawyerStats extends React.Component {
  render() {
    const { lawyers } = this.props;
    const lawyerNames = lawyers.map(x => Object.keys(x));
    const lawyersObj = lawyers.reduce((acc, curr) => {
      const key = Object.keys(curr)[0];
      const byYearObj = curr[key];

      const grantByYear = Object.keys(byYearObj).map(year => {
        const numGranted = byYearObj[year];
        return { year, numGranted };
      });

      acc[key] = grantByYear;
      return acc;
    }, {});
    console.log(lawyersObj);

    const panes = lawyerNames.filter(x => x != "BRW" && x != "AMF").map(x => {
      return {
        menuItem: x[0],
        render: () => (
          <Tab.Pane style={{ height: "330px" }}>
            <BarChart
              width={400}
              height={300}
              data={lawyersObj[x]}
              margin={{ top: 50, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar type="monotone" dataKey="numGranted" barSize={30} fill="#8884d8" />
            </BarChart>
          </Tab.Pane>
        )
      };
    });

    return <Tab panes={panes} />;
  }
}
