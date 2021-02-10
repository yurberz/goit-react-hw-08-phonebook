import React from "react";
import styled from "styled-components";

const Div = styled.div`
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ children }) => <Div>{children}</Div>;

export default Layout;
