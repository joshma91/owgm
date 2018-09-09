import React, { Component } from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";
import { Segment, Header, Tab, Image, Grid } from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesConfig from "./json/particlesConfig.json";
import Layout from "./components/Layout";
import TabPane from "./components/TabPane";
import FirmStats from "./components/FirmStats";
import LawyerStats from "./components/LawyerStats";
import "./App.css";
import Allowed from "./json/Allowed.json";
import NonPCT from "./json/NonPCT.json";
import PCT from "./json/PCT.json";
import OfficeAction from "./json/OfficeAction.json";

class App extends Component {
  state = {
    lawyers: null,
    granted: null,
    grantedByYear: null,
    appliedByYear: null
  };

  componentDidMount = async () => {
    await this.getLawyers();
    this.getGrantedApplications();
    this.getGrantedByYear();
    this.getAppliedByYear();
    await this.getLawyerGrantsByYear();
  };

  getLawyers = async () => {
    const lawyers = [...new Set(OfficeAction.map(item => item.Attorney))];
    console.log(lawyers);
    this.setState({ lawyers });
  };

  getGrantedApplications = () => {
    const grantedFilter = Allowed.filter(x => x.Status == "Granted");
    const granted = Object.keys(grantedFilter).length;
    this.setState({ granted });
  };

  getGrantedByYear = () => {
    const grantedFilter = Allowed.filter(x => x.Status == "Granted");
    const grantedByYearObj = this.totalByYear(grantedFilter, "DueDate");

    const grantedByYear = Object.keys(grantedByYearObj).map(year => {
      const num = grantedByYearObj[year];
      return { year, num };
    });

    this.setState({ grantedByYear });
  };

  getAppliedByYear = () => {
    const nonPCTAppliedByYearObj = this.totalByYear(NonPCT, "FilDate");
    const PCTAppliedByYearObj = this.totalByYear(PCT, "DateTaken");

    const appliedByYear = Object.keys(PCTAppliedByYearObj).map(year => {
      const numPCT = PCTAppliedByYearObj[year];
      const numNonPCT = nonPCTAppliedByYearObj[year];
      return { year, numPCT, numNonPCT };
    });

    this.setState({ appliedByYear });
  };

  getLawyerGrantsByYear = async () => {
    const { lawyers } = this.state;
    const update = lawyers.map(lwr => {
      const grantedFilter = Allowed.filter(x => x.Status == "Granted");
      const lawyerGrantByYear = this.totalByYear(
        grantedFilter.filter(x => x.Attorney == lwr),
        "DueDate"
      );

      return { [lwr]: lawyerGrantByYear };
    });
    this.setState({ lawyers: update });
  };

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
    return byYear;
  };

  render() {
    const { lawyers, granted, grantedByYear, appliedByYear } = this.state;
    console.log("grantedByYear", grantedByYear);
    const background =
      "https://patentable.com/wp-content/uploads/2016/10/ow_logo_header.png";
    const panes = [
      {
        menuItem: "Firm Statistics",
        render: () => (
          <Tab.Pane style={{ height: "400px" }}>
            <FirmStats
              grantedByYear={grantedByYear}
              appliedByYear={appliedByYear}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Lawyer Statistics",
        render: () => (
          <Tab.Pane style={{ height: "400px" }}>
            <LawyerStats lawyers={lawyers} />
          </Tab.Pane>
        )
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
            <p>Number of Allowed PPH Applications: {granted}</p>
          </Segment>

          <Tab panes={panes} />
        </Layout>
      </div>
    );
  }
}

export default App;
