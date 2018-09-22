import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Segment, Header, Tab, Image, Button } from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesConfig from "./json/particlesConfig.json";
import Layout from "./components/Layout";
import FirmStats from "./components/FirmStats";
import LawyerStats from "./components/LawyerStats";
import OAStats from "./components/OAStats"
import "./App.css";
import Allowed from "./json/Allowed.json";
import NonPCT from "./json/NonPCT.json";
import PCT from "./json/PCT.json";
import OfficeAction from "./json/OfficeAction.json";
import Combined from "./json/Combined.json";
import Presentation from "./components/Presentation"

class App extends Component {
  state = {
    lawyers: null,
    granted: null,
    grantedByYear: null,
    appliedByYear: null,
    firstOfficeAction: null,
    oaTimeByYear: null,
    presentationView: false
  };

  componentDidMount = async () => {
    await this.getLawyers();
    this.getGrantedApplications();
    this.getGrantedByYear();
    this.getAppliedByYear();
    await this.getLawyerGrantsByYear();
    await this.getFirstOfficeAction();
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

  getFirstOfficeAction = async () => {
    const firstAction = OfficeAction.filter((x, i, self) => {
      return (
        self
          .map(item => {
            return item.CaseNumber;
          })
          .indexOf(x.CaseNumber) === i
      );
    });

    // Filter only for GRANTED and PENDING statuses
    const monthsBetween = firstAction.map(x => {
      const filed = Combined.filter(y => {
        return (
          y.CaseNumber == x.CaseNumber &&
          (y.Status == "Pending" || y.Status == "Granted")
        );
      });

      if (filed.length >= 1) {
        const oaDate = new Date(x.DueDate);
        const filedDate = new Date(filed[0].FilDate);
        oaDate.setMonth(oaDate.getMonth() - 6);
        const timeDiff = Math.abs(oaDate.getTime() - filedDate.getTime());
        const diffMonths = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        const combined = filed[0];
        combined.monthsToOA = diffMonths;
        combined.yearFiled = filedDate.getFullYear()
        return combined;
      }
    });

    const monthsBetweenFiltered = monthsBetween.filter(x => x !== undefined);

    const diffByYear = monthsBetweenFiltered.reduce((a, { yearFiled, monthsToOA}) => {
      a[yearFiled] = a[yearFiled] || { sum: 0, count: 0}
      a[yearFiled].sum += monthsToOA
      a[yearFiled].average = a[yearFiled].sum / ++a[yearFiled].count
      return a     
    }, {})

    console.log(diffByYear)
    
    const diffByYearClean = Object.keys(diffByYear).map(x => {
      const diff = diffByYear[x]
      return {year: x, months: diff.average}
    })
    console.log(diffByYearClean)
    this.setState({oaTimeByYear: diffByYearClean})
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

  toPresentation = (option) => {
    this.setState({presentationView: option})
  }

  render() {
    const { lawyers, granted, grantedByYear, appliedByYear, oaTimeByYear, presentationView } = this.state;
    const color = 'white'
    console.log("grantedByYear", grantedByYear);
    const background =
      "https://patentable.com/wp-content/uploads/2016/10/ow_logo_header.png";
    const panes = [
      {
        menuItem: "Firm Statistics",
        render: () => (
          <Tab.Pane style={{ height: "400px", backgroundImage: "linear-gradient(to right, #fff8f2 , white)" }}>
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
          <Tab.Pane style={{ height: "400px", backgroundImage: "linear-gradient(to right, #fff8f2 , white)"  }}>
            <LawyerStats lawyers={lawyers} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Office Action Statistics",
        render:() => (
          <Tab.Pane style={{ height: "400px", backgroundImage: "linear-gradient(to right, #fff8f2 , white)" }}>
            <OAStats
              oaTimeByYear={oaTimeByYear}
            />
          </Tab.Pane>
        )
      }
    ];

    console.log("presentation", presentationView)
    return presentationView ? (<Presentation slide={3} toPresentation={this.toPresentation}/>) : (
      <div className="App">
        <Particles params={particlesConfig} />

        <Layout>
          <div>
            <Image src={background} size="small" />
          </div>

          <Segment style={{backgroundImage: "linear-gradient(to right, #fff8f2 , white)"}}>
            <Header as="h2">OWGM PPH LawyerStats</Header>
            <p>Number of Allowed PPH Applications: {granted}</p>
            <Button primary onClick={() => this.toPresentation(true)}>To Presentation</Button>
          </Segment>

          <Tab menu={{}} panes={panes}  />
        </Layout>
      </div>
    );
  }
}

export default App;
