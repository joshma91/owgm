import React from 'react';
import { Container } from "semantic-ui-react";

const FixedMenuLayout = ({ children }) => (
  <Container style={{ paddingTop: "2em" }}>{children}</Container>
);

export default FixedMenuLayout;
