import React, { Component } from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";
import { Segment, Header, Tab, Image } from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesConfig from "./json/particlesConfig.json";
import Layout from "./components/Layout";
import TabPane from "./components/TabPane";
import "./App.css";
import Allowed from "./json/Allowed.json";
import NonPCT from "./json/NonPCT.json";
import PCT from "./json/PCT.json";
import OfficeAction from "./json/OfficeAction.json";

class App extends Component {
  state = { lawyers: null, granted: null, grantedByYear: null };

  componentDidMount = async () => {
    this.getLawyers();
    this.getGrantedApplications();
    this.getGrantedByYear();
    this.getAppliedByYear();
  };

  getLawyers = () => {
    const lawyers = [...new Set(OfficeAction.map(item => item.Attorney))];
    this.setState({ lawyers });
  };

  getGrantedApplications = () => {
    const grantedFilter = Allowed.filter(x => x.Status == "Granted");
    const granted = Object.keys(grantedFilter).length;
    this.setState({ granted });
  };

  getGrantedByYear = () => {
    const grantedFilter = Allowed.filter(x => x.Status == "Granted");
    const grantedByYearObj = grantedFilter.reduce((acc, curr) => {
      const grantDate = new Date(curr.DueDate);
      const year = grantDate.getFullYear();

      if (typeof acc[year] == "undefined") {
        acc[year] = 1;
      } else {
        acc[year] += 1;
      }
      return acc;
    }, {});

    console.log(grantedByYearObj)
    const grantedByYear = Object.keys(grantedByYearObj).map(year => {
      const num = grantedByYearObj[year]
      return {year, num}
    })
    console.log(grantedByYear)
    
    this.setState({ grantedByYear });
  };

  getAppliedByYear = () => {
    const appliedByYearObj = this.totalByYear(NonPCT, "FilDate")
    console.log(appliedByYearObj)
  }

  totalByYear = (data, dateField) => {
    const byYear = data.reduce((acc, curr) => {
      const date = new Date(curr[dateField]);
      const year = date.getFullYear();

      if (typeof acc[year] == "undefined") {
        acc[year] = 1;
      } else {
        acc[year] += 1;
      }
      return acc;
    }, {});
    return byYear
  }

  render() {
    const { lawyers, granted, grantedByYear } = this.state;
    const background =
      "https://patentable.com/wp-content/uploads/2016/10/ow_logo_header.png";
    const panes = [
      {
        menuItem: "Firm Statistics",
        render: () => (
          <TabPane>
            <p style={{float:"left", fontSize:"large"}}>Number of Granted PPH Applications</p>
            <BarChart width={600} height={300} data={grantedByYear} margin={{top: 50, right: 30, left: 20, bottom: 5}}>>
              <Label value="Number of Granted PPH Applications" />
              <XAxis dataKey="year" >
              </XAxis>
              <YAxis />
              <Tooltip/>
              <Bar
                type="monotone"
                dataKey="num"
                barSize={30}
                fill="#8884d8"
              />
            </BarChart>
          </TabPane>
        )
      },
      {
        menuItem: "Lawyer Statistics",
        render: () => <TabPane>Tab 2 Content</TabPane>
      }
    ];

    return (
      <div className="App">
        <Particles params={particlesConfig} />

        <Layout>
          <div>
            <Image src={background} size="small" />
            <Header color="blue" size="huge" style={{ display: "inline" }}>
              OWGM PPH Stats
            </Header>
          </div>

          <Segment>
            <Header as="h2">Basic Stats</Header>
            <p>Lawyers: {lawyers}</p>
            <p>Number of Allowed PPH Applications: {granted}</p>
          </Segment>

          <Tab panes={panes} />
        </Layout>
      </div>
    );
  }
}

export default App;
