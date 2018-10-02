import React from "react";
import { Tab, Image, Input, Button, Message } from "semantic-ui-react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import OfficeAction from "../json/OfficeAction.json";
import ordOfficeAction from "../json/nonPPH/OfficeAction.json";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default class Calendar extends React.Component {
  state = { eventList: null, lawyerNames: null };

  componentDidMount = async () => {
    const today = new Date();
    const { lawyers } = this.props;
    today.setHours(0, 0, 0, 0);

    const lawyerNames = lawyers.map(x => Object.keys(x));

    const eventList = lawyerNames.reduce((acc, lawyer) => {
      const events = this.eventHelper(OfficeAction, lawyer, today);
      const events2 = this.eventHelper(ordOfficeAction, lawyer, today).filter(x => x !== null)

      acc[lawyer] = events.filter(x => x !== null).concat(events2.filter(x => x !== null));
      
      return acc;
    }, {});

    console.log(eventList);

    this.setState({ eventList, lawyerNames });
  };

  eventHelper = (OA, lawyer, today) => {
    return OA.map(y => {
      const check = new Date(y.DueDate);
      if (check >= today && lawyer == y.Attorney) {
        const day = moment(check);
        return {
          title: y.CaseNumber,
          start: day,
          end: day,
          allDay: true
        };
      }
      return null;
    });
  };

  render() {
    const { eventList, lawyerNames } = this.state;
    const localizer = BigCalendar.momentLocalizer(moment);
    let panes;
    if (Boolean(eventList)) {
      panes = lawyerNames.filter(x => x != "BRW" && x != "AMF" && x != "RAJ" && x != "GSO" && x != "EYX").map(x => {
        return {
          menuItem: x[0],
          render: () => (
            <BigCalendar
              style={{ height: 500 }}
              localizer={localizer}
              events={eventList[x[0]]}
              startAccessor="start"
              endAccessor="end"
            />
          )
        };
      });
    }
    return (
      <div>
        {Boolean(eventList) ? (
          <Tab panes={panes} />
        ) : (
          <span> Loading Calendar </span>
        )}
      </div>
    );
  }
}
