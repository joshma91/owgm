import React from "react";
import { Grid, Image, Input, Button, Message } from "semantic-ui-react";
import dataImage from "../assets/TSNEVisualizer.png";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Label } from "recharts";
import store from "../nb/store.json";
const BayesClassifier = require("bayes-classifier");
const classifier = new BayesClassifier();

export default class OAStats extends React.Component {
  state = { abstract: null, result: null };

  setAbstract = e => this.setState({ abstract: e.target.value });

  classify = () => {
    const { abstract } = this.state;
    classifier.restore(store);
    const result = classifier.getClassifications(abstract);
    this.setState({ result });
    console.log(result);
  };

  render() {
    const { abstract, result } = this.state;

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <p className="chartTitle">Document Classification</p>
            <div>
              <Image size="large" src={dataImage} />
            </div>
          </Grid.Column>
          <Grid.Column>
            <p class="chartTitle">Naive Bayes Classifier</p>
            <br />

            <Input
              placeholder="Abstract"
              value={abstract}
              onChange={this.setAbstract}
              style={{float:'left', paddingTop:'10px'}}
            />

            <Button onClick={this.classify} style={{marginTop:'10px'}}>Classify!</Button>
            <Message info visible={Boolean(result)}>
              <p>
                {result ? (
                  <div>
                    <p>
                      {result[0].label} value: {result[0].value}
                    </p>
                    <p>
                      {result[1].label} value: {result[1].value}
                    </p>
                  </div>
                ) : (
                  <p>nothing yet</p>
                )}
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
