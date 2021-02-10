import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";

const PrivateRoute = ({ component: Page, isAuth, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) => (isAuth ? <Page {...props} /> : <Redirect to="/" />)}
  />
);

const mSTP = (state) => ({
  isAuth: authSelectors.isAuth(state),
});

export default connect(mSTP)(PrivateRoute);
