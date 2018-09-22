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
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const Button = ({ title }) => <button type="button">{title}</button>;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={["zoom"]} bgColor="primary">
        <GoToAction slide={3}>Jump to 3</GoToAction>
          <Button title="My Button" />
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Patent Prosecution Highway - How are we doing?
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            also, look at all the time Josh wasted
          </Text>
          <br />
          <img
            style={{ height: "200px" }}
            src="http://comicsandmemes.com/wp-content/uploads/comment-reply-001-wait-what-koala.jpg"
          />
        </Slide>
        <Slide transition={["zoom"]}>
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
        </Slide>

        <Slide transition={["fade"]} bgColor="tertiary">
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
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
