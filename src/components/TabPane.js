import React from 'react';
import { Tab } from "semantic-ui-react";

const TabPane = ({ children }) => (
  <Tab.Pane style={{height:"400px"}}>{children}</Tab.Pane>
);

export default TabPane;
