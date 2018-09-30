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
  GoToAction
} from "spectacle";
import { Button } from "semantic-ui-react"
import createTheme from "spectacle/lib/themes/default";
import MySlide from "./MySlide"

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "slategrey",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
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
          <Table>
            <TableRow>
              <TableHeaderItem />
              <TableHeaderItem>2011</TableHeaderItem>
            </TableRow>
            <TableRow>
              <TableItem>None</TableItem>
              <TableItem>61.8%</TableItem>
            </TableRow>
            <TableRow>
              <TableItem>jQuery</TableItem>
              <TableItem>28.3%</TableItem>
            </TableRow>
          </Table>
        </MySlide>

        <MySlide toPresentation={this.props.toPresentation}>
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </MySlide>
        <MySlide toPresentation={this.props.toPresentation}>
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </MySlide>
        <MySlide toPresentation={this.props.toPresentation}>
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </MySlide>
      </Deck>
    );
  }
}
