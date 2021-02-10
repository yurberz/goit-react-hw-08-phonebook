import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";

const PublicRoute = ({ component: Page, isAuth, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuth && routeProps.restricted ? (
        <Redirect to="/contacts" />
      ) : (
        <Page {...props} />
      )
    }
  />
);

const mSTP = (state) => ({
  isAuth: authSelectors.isAuth(state),
});

export default connect(mSTP)(PublicRoute);
