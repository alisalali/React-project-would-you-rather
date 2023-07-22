import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { isEmpty } from "../utils/helpers";
//import Navi from "./Navi";

const PrivateRoute = ({ component: Component, notLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return notLoggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: !isEmpty(authedUser)
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(
  PrivateRoute
);
