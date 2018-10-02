import React from "react";
import { Grid, Tab } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label, LabelList } from "recharts";

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

    const panes = lawyerNames.filter(x => x != "BRW" && x != "AMF" && x != "RAJ" && x != "GSO" && x != "EYX").map(x => {
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
                  value="Granted"
                  angle="-90"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "slategrey"}}
                  offset={0}
                />
              </YAxis>
              <Tooltip />
              <Bar type="monotone" dataKey="numGranted" barSize={30} fill="#8884d8">
                <LabelList dataKey="numGranted" position="top" style={{fill: "slategrey"}} />
              </Bar>
            </BarChart>
          </Tab.Pane>
        )
      };
    });

    return <Tab panes={panes} defaultActiveIndex={7}/>;
  }
}
