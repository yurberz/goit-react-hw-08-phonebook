import React from "react";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import authOperations from "../../redux/auth/authOperations";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  margin-left: auto;
  margin-bottom: 20px;
  align-items: baseline;

  span {
    font-weight: 700;
    margin-right: 12px;
  }

  button {
    padding: 5px, 3px;
    border-radius: 4px;
    color: #fff;
    background-color: #0095f6;
    font-weight: 500;
    font-size: 12px;
  }
`;

const UserMenu = ({ name, onLogout }) => (
  <Div>
    <span>Welcome, {name}</span>
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  </Div>
);

const mSTP = (state) => ({
  name: authSelectors.getUserName(state),
});

const mDTP = {
  onLogout: authOperations.logOut,
};

export default connect(mSTP, mDTP)(UserMenu);
