import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Segment, Header, Tab, Image, Button } from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesConfig from "./json/particlesConfig.json";
import Layout from "./components/Layout";
import FirmStats from "./components/FirmStats";
import LawyerStats from "./components/LawyerStats";
import OAStats from "./components/OAStats";
import ComparativeStats from "./components/ComparativeStats";
import Ordinary from "./components/Ordinary"
import ML from "./components/ML";
import Calendar from "./components/Calendar"
import "./App.css";
import Allowed from "./json/Allowed.json";
import NonPCT from "./json/NonPCT.json";
import PCT from "./json/PCT.json";
import OfficeAction from "./json/OfficeAction.json";
import Combined from "./json/Combined.json";
import Instant from "./json/Instant.json"
import nonCombined from "./json/nonPPH/Combined.json";
import nonOfficeAction from "./json/nonPPH/OfficeAction.json";
import NormAllowed from "./json/nonPPH/Allowed.json"
import NormPCT from "./json/nonPPH/PCT.json"
import NormNonPCT from "./json/nonPPH/NonPCT.json"

import Presentation from "./components/Presentation";

class App extends Component {
  state = {
    lawyers: null,
    granted: null,
    grantedByYear: null,
    appliedByYear: null,
    firstOfficeAction: null,
    oaTimeByYear: null,
    grantTime: null,
    nonOATimeByYear: null,
    presentationView: false,
    firstOACompare: null,
    instantRate: null,
    grantRate: null,
    ordGrantedByYear: null,
    ordAppliedByYear: null

  };

  componentDidMount = async () => {
    await this.getLawyers();
    this.getGrantedApplications();
    const grantedByYear = this.getGrantedByYear(Allowed);
    const appliedByYear = this.getAppliedByYear(NonPCT, PCT);
    const ordGrantedByYear = this.getGrantedByYear(NormAllowed)
    const ordAppliedByYear = this.getAppliedByYear(NormNonPCT, NormPCT)
    await this.getLawyerGrantsByYear();
    await this.nonPPHYearDiff();
    await this.PPHYearDiff();
    const grantTime = await this.timeToGrantByYear(Allowed, Combined)
    console.log("grantTime: ", grantTime)
    await this.comparativeFirstOA();
    await this.comparativeGrantRate();
    await this.instantGrantRate();
    await this.setState({grantedByYear, appliedByYear, ordGrantedByYear, ordAppliedByYear, grantTime})
  };

  getLawyers = async () => {
    const lawyers = [...new Set(nonOfficeAction.map(item => item.Attorney))];
    this.setState({ lawyers });
  };

  getGrantedApplications = () => {
    const grantedFilter = Allowed.filter(x => x.Status == "Granted");
    const granted = Object.keys(grantedFilter).length;
    this.setState({ granted });
  };

  getGrantedByYear = (allowed) => {
    const grantedFilter = allowed.filter(x => x.Status == "Granted");
    const grantedByYearObj = this.totalByYear(grantedFilter, "DueDate");

    const grantedByYear = Object.keys(grantedByYearObj).map(year => {
      const num = grantedByYearObj[year];
      return { year, num };
    });

    return grantedByYear
  };

  getAppliedByYear = (nonPCT, pct) => {
    const nonPCTAppliedByYearObj = this.totalByYear(nonPCT, "FilDate");
    const PCTAppliedByYearObj = this.totalByYear(pct, "DateTaken");

    const appliedByYear = Object.keys(PCTAppliedByYearObj).map(year => {
      const numPCT = PCTAppliedByYearObj[year];
      const numNonPCT = nonPCTAppliedByYearObj[year];
      return { year, numPCT, numNonPCT };
    });
    return appliedByYear
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

  timeToGrantByYear = async (allowed, combined) => {
    const monthsBetween = allowed.map(x => {
      const filed = combined.filter(y => {
        return (
          y.CaseNumber == x.CaseNumber &&
          y.Status == "Granted" &&
          y.CaseType !== "DIV"
        );
      });


      if (filed.length >= 1) {
        const oaDate = new Date(x.DueDate);
        const filedDate = new Date(filed[0].FilDate);
        oaDate.setMonth(oaDate.getMonth() - 7);
        const timeDiff = Math.abs(oaDate.getTime() - filedDate.getTime());
        const diffMonths = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        const combined = filed[0];
        combined.monthsToOA = diffMonths;
        combined.yearFiled = filedDate.getFullYear();
        return combined;
      }
    });

    const monthsBetweenFiltered = monthsBetween.filter(x => x !== undefined);

    const diffByYear = monthsBetweenFiltered.reduce(
      (a, { yearFiled, monthsToOA }) => {
        a[yearFiled] = a[yearFiled] || { sum: 0, count: 0 };
        a[yearFiled].sum += monthsToOA;
        a[yearFiled].average = a[yearFiled].sum / ++a[yearFiled].count;
        return a;
      },
      {}
    );

    const diffByYearClean = Object.keys(diffByYear).map(x => {
      const diff = diffByYear[x];
      return { year: x, months: parseFloat(diff.average.toFixed(1)) };
    });
    return diffByYearClean;
  }

  firstOAByYearHelper = async (officeAction, combined) => {
    const firstAction = officeAction.filter((x, i, self) => {
      return (
        self
          .map(item => {
            return item.CaseNumber;
          })
          .indexOf(x.CaseNumber) === i
      );
    });

    // Filter only for GRANTED and PENDING statuses and NO DIV
    const monthsBetween = firstAction.map(x => {
      const filed = combined.filter(y => {
        return (
          y.CaseNumber == x.CaseNumber &&
          (y.Status == "Pending" || y.Status == "Granted") &&
          y.CaseType !== "DIV"
        );
      });


      if (filed.length >= 1) {
        const oaDate = new Date(x.DueDate);
        const filedDate = new Date(filed[0].FilDate);
        oaDate.setMonth(oaDate.getMonth() - 7);
        const timeDiff = Math.abs(oaDate.getTime() - filedDate.getTime());
        const diffMonths = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        const combined = filed[0];
        combined.monthsToOA = diffMonths;
        combined.yearFiled = filedDate.getFullYear();
        return combined;
      }
    });

    const monthsBetweenFiltered = monthsBetween.filter(x => x !== undefined);

    const diffByYear = monthsBetweenFiltered.reduce(
      (a, { yearFiled, monthsToOA }) => {
        a[yearFiled] = a[yearFiled] || { sum: 0, count: 0 };
        a[yearFiled].sum += monthsToOA;
        a[yearFiled].average = a[yearFiled].sum / ++a[yearFiled].count;
        return a;
      },
      {}
    );

    const diffByYearClean = Object.keys(diffByYear).map(x => {
      const diff = diffByYear[x];
      return { year: x, months: parseFloat(diff.average.toFixed(1)) };
    });
    return diffByYearClean;
  };

  instantGrantHelper = (officeAction, allowed) => {
    const officeActions = officeAction.filter((x, i, self) => {
      return (
        self
          .map(item => {
            return item.CaseNumber;
          })
          .indexOf(x.CaseNumber) === i && x.Country == "CA"
      );
    });

    //Log here for unique
    const operation = (list1, list2, isUnion = false) =>
    list1.filter( a => isUnion === list2.some( b => a.CaseNumber === b.CaseNumber ) );

    const instant = operation(allowed, officeAction);

    return instant.length/(instant.length + officeActions.length)
  }

  instantGrantRate = async () => {
    const pphInstantRate = this.instantGrantHelper(OfficeAction, Allowed) 

    const nonInstantRate = this.instantGrantHelper(nonOfficeAction, NormAllowed)

    const instantRate = [
      { type: "Expedited", instantRate: parseFloat(pphInstantRate.toFixed(3)) },
      { type: "non-Expedited", instantRate: parseFloat(nonInstantRate.toFixed(3)) }
    ];
    this.setState({instantRate})
  }

  nonPPHYearDiff = async () => {
    const nonOATimeByYear = await this.firstOAByYearHelper(
      nonOfficeAction,
      nonCombined
    );

    this.setState({ nonOATimeByYear });
  };

  PPHYearDiff = async () => {
    const oaTimeByYear = await this.firstOAByYearHelper(OfficeAction, Combined);
    this.setState({ oaTimeByYear });
  };

  // only get years after 2008 - when PPH started
  comparativeFirstOA = () => {
    const { oaTimeByYear, nonOATimeByYear } = this.state;

    const pphAverage = oaTimeByYear.reduce((acc, curr, i) => {
      return acc + (curr.months - acc) / (i + 1);
    }, 0);

    const nonAverage = nonOATimeByYear.reduce((acc, curr, i) => {
      return acc + (curr.months - acc) / (i + 1);
    }, 0);

    const firstOACompare = [
      { type: "Expedited", averageTime: parseFloat(pphAverage.toFixed(3)) },
      { type: "non-Expedited", averageTime: parseFloat(nonAverage.toFixed(3)) }
    ];
    this.setState({ firstOACompare });
  };


  comparativeGrantRate = async () => {
    const nonPPHRate = this.rateHelper(nonCombined)
    const PPHRate = this.rateHelper(Combined)

    const grantRate = [
      { type: "Expedited", grantRate: parseFloat(PPHRate.toFixed(3)) },
      { type: "non-Expedited", grantRate: parseFloat(nonPPHRate.toFixed(3)) }
    ];
    this.setState({grantRate})
  }

  rateHelper = (combined) => {
    const temp = combined.reduce((acc, curr) => {
      if(curr.Status == "Granted") {
        acc.grantCount++
      } else if (curr.Status == "Abandoned") {
        acc.abandonCount++
      }
      return acc;
    },{grantCount: 0, abandonCount: 0})
    return temp.grantCount/(temp.grantCount + temp.abandonCount)
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
    return byYear;
  };

  toPresentation = option => {
    this.setState({ presentationView: option });
  };

  render() {
    const {
      lawyers,
      granted,
      grantedByYear,
      appliedByYear,
      oaTimeByYear,
      nonOATimeByYear,
      firstOACompare,
      grantRate,
      instantRate,
      presentationView,
      ordAppliedByYear,
      ordGrantedByYear,
      grantTime
    } = this.state;
    const background =
      "https://patentable.com/wp-content/uploads/2016/10/ow_logo_header.png";
    const panes = [
      {
        menuItem: "Firm Statistics",
        render: () => (
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
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
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <LawyerStats lawyers={lawyers} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "CIPO Statistics",
        render: () => (
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <OAStats oaTimeByYear={oaTimeByYear} grantTime={grantTime} nonOATimeByYear={nonOATimeByYear} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Comparative Statistics",
        render: () => (
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <ComparativeStats firstOACompare={firstOACompare} grantRate = {grantRate} 
            instantRate = {instantRate}/>
          </Tab.Pane>
        )
      },
      {
        menuItem: '"Data Science"',
        render: () => (
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <ML />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Ordinary Applications',
        render: () => (
          <Tab.Pane
            style={{
              height: "400px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <Ordinary ordAppliedByYear={ordAppliedByYear} ordGrantedByYear={ordGrantedByYear}/>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Fun Stuff',
        render: () => (
          <Tab.Pane
            style={{
              height: "570px",
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <Calendar lawyers={lawyers} />
          </Tab.Pane>
        )
      }
    ];
    return presentationView ? (
      <Presentation slide={3} toPresentation={this.toPresentation} />
    ) : (
      <div className="App">
        <Particles params={particlesConfig} />

        <Layout>
          <div>
            <Image src={background} size="small" />
          </div>

          <Segment
            style={{
              backgroundImage: "linear-gradient(to right, #fff8f2 , white)"
            }}
          >
            <Header as="h2" color="grey">OWGM Analytics</Header>
            <Button color={"twitter"} onClick={() => this.toPresentation(true)}>
              To Presentation
            </Button>
          </Segment>

          <Tab menu={{}} panes={panes} style={{paddingTop:"25px"}}/>
        </Layout>
      </div>
    );
  }
}

export default App;
