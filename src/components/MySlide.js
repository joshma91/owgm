import React from "react";
import { Button } from "semantic-ui-react";
import { Slide } from "spectacle";

export default class MySlide extends React.Component {
  render() {
    return (
      <Slide className="slide" transition={["fade"]}>
        {" "}
        <Button
          style={{ position: "absolute", top: "-100px", left: "20px" }}
          color={"twitter"}
          onClick={() => this.props.toPresentation(false)}
        >
          To Graphs
        </Button>{" "}
        {this.props.children}
      </Slide>
    );
  }
}

