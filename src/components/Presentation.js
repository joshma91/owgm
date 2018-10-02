// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Table,
  TableRow,
  TableHeaderItem,
  TableItem,
  GoToAction,
  TableHeader,
  TableBody
} from "spectacle";
import { Button } from "semantic-ui-react";
import createTheme from "spectacle/lib/themes/default";
import MySlide from "./MySlide";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "slategrey",
    secondary: "#1F2022",
    tertiary: "#55acee",
    quartenary: "#ff6060"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <MySlide toPresentation={this.props.toPresentation}>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Expedited Examinations
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            A Look At the Data
          </Text>
          <br />
          <img
            style={{ height: "200px" }}
            src="https://static.vecteezy.com/system/resources/previews/000/166/746/large_2x/vector-data-center-design-illustration.jpg"
          />
        </MySlide>
        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Expedited Exams
          </Heading>
          <List>
            <ListItem>Patent Prosecution Highway (PPH)</ListItem>
            Based on favourable national or international (PCT) "work products"
            <ListItem>
              Special Order
              <List>
                <ListItem style={{ fontSize: "2rem" }}>
                  Must assert that failure to advance the application is likely
                  to prejudice the applicant's rights
                </ListItem>{" "}
                <ListItem style={{ fontSize: "2rem" }}>
                  First Office Action within 60 days
                </ListItem>{" "}
              </List>
            </ListItem>
            <ListItem>Green Tech</ListItem>
            Relates to technology which would help to resolve or mitigate
            environmental impacts
          </List>
        </MySlide>

        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Patent Prosecution Highway
          </Heading>
          <List>
            <ListItem>Favourable work product:</ListItem>
            From PCT: a favourable Written Opinion to the International Search
            Report
            <ListItem>
              From participating patent offices
              <List>
                <ListItem style={{ fontSize: "2rem" }}>
                  Currently 29 other partner offices
                </ListItem>
                <ListItem style={{ fontSize: "2rem" }}>
                  Includes USPTO, EPO, JPO, SIPO
                </ListItem>
                <ListItem style={{ fontSize: "2rem" }}>
                  First examining office must have found at least one allowable
                  claim
                </ListItem>
              </List>
            </ListItem>
          </List>
        </MySlide>

        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            PPH Benefits
          </Heading>
          <List>
            <ListItem>Faster time to first office action</ListItem>

            <ListItem>Higher allowance rates</ListItem>

            <ListItem>
              Time from filing to final decision:
              <List>
                <ListItem style={{ fontSize: "2rem" }}>
                  5.4 months for PPH vs 31.2 months for other applications
                </ListItem>{" "}
              </List>
            </ListItem>

            <ListItem>
              Lower # of office actions:{" "}
              <List>
                <ListItem style={{ fontSize: "2rem" }}>
                  0.9 for PPH vs 1.6 for other applications
                </ListItem>{" "}
              </List>
            </ListItem>
          </List>
        </MySlide>

        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Strategic Considerations
          </Heading>
          <List>
            <ListItem>Deferred examination and then PPH request</ListItem>

            <ListItem>
              Fast tracking with "Special Order" and then make PPH requests in
              participating foreign offices
            </ListItem>
          </List>
        </MySlide>

        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            PPH Caveats
          </Heading>
          <List>
            <ListItem>Methods of medical treatment not allowed in Canada</ListItem>

            <ListItem>
              Double patenting               <List>
                <ListItem style={{ fontSize: "2rem" }}>
                  Consider allowing examination of corresponding applications to proceed in foreign jurisdiction to understand allowable claim scope in Canada
                </ListItem>{" "}
              </List>
            </ListItem>
          </List>
        </MySlide>


            <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Sample of PPH Office Actions
          </Heading>
          <List>
            <ListItem>20 PPH applications sampled</ListItem>
            <br/>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem style={{ fontSize: "1.5rem" }}>Objection</TableHeaderItem>
                <TableHeaderItem style={{ fontSize: "1.5rem" }}># of Occurences</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Indefinite claims</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>10</TableItem>
              </TableRow>
              
              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Description defects</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>6</TableItem>
              </TableRow>

              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Prior art</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>5</TableItem>
              </TableRow>

                           <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Drawing defect</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>4</TableItem>
              </TableRow>

              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Unity of invention</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>3</TableItem>
              </TableRow>


              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Non-statutory subject matter</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>2</TableItem>
              </TableRow>

              <TableRow>
                <TableItem style={{ fontSize: "1.5rem" }}>Claims not supported by description</TableItem>
                <TableItem style={{ fontSize: "1.5rem" }}>2</TableItem>
              </TableRow>
            </TableBody>
          </Table>
          <ListItem>Prior art objection?</ListItem>
          </List>
        </MySlide>

      <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Expedited Exam Trends at OWGM
          </Heading>
          <List>
            <ListItem>Generally increasing # of PPH applications</ListItem>
            <ListItem>Increase in granted PPH applications</ListItem>
            <ListItem textColor="indigo">A look at the data</ListItem>
           
          </List>
        </MySlide>

            <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            CIPO Trends
          </Heading>
          <List>
            <ListItem>Faster time to first office action</ListItem>
            <ListItem>Faster time to grant</ListItem>
            
          </List>
        </MySlide>

        
        <MySlide toPresentation={this.props.toPresentation}>
          <Heading style={{ fontSize: "2em" }} textColor="tertiary">
            Miscellaneous Discussion
          </Heading>
          <List>
            <ListItem>Document similarity and treatment (machine learning)</ListItem>
            <ListItem>Non-expedited exam trends</ListItem>
            
          </List>
        </MySlide>


      <MySlide toPresentation={this.props.toPresentation}>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Thank you
          </Heading>

          <br />
          <Heading size={1} fit caps lineHeight={1} textColor="quartenary">
            Questions?
          </Heading>
        </MySlide>
      </Deck>
    );
  }
}
