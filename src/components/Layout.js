import React from 'react';
import { Container } from "semantic-ui-react";

const FixedMenuLayout = ({ children }) => (
  <Container style={{ paddingTop: "2em", paddingBottom: "7em" }}>{children}</Container>
);

export default FixedMenuLayout;
