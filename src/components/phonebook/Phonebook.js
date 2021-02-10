import { Component, Suspense } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import authOperations from "../../redux/auth/authOperations";
import routesPages from "../../routes";

class Phonebook extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {routesPages.map((route) =>
              route.private ? (
                <PrivateRoute key={route.path} {...route} />
              ) : (
                <PublicRoute key={route.path} {...route} />
              )
            )}
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

const mDTP = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mDTP)(Phonebook);
