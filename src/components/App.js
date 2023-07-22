import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
//import Routes from "./Routes";
import Navi from "./Navi";
import { Container } from "reactstrap";

import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";
import Logout from "./Logout";
import PrivateRoute from "./PrivateRoute";
import { isEmpty } from "../utils/helpers";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <Container>
            <div>
              <h1 className="text-center">Would You Reather</h1>
              <Navi />
              <Switch>
                {notLoggedIn === true ? (
                  <Route path="/" component={Login} />
                ) : (
                  <Fragment>
                    <PrivateRoute path="/" exact component={Dashboard} />
                    <PrivateRoute
                      path="/leaderboard"
                      exact
                      component={LeaderBoard}
                    />
                    <PrivateRoute path="/add" component={NewQuestion} />
                    <PrivateRoute
                      path="/questions/:id"
                      component={QuestionDetails}
                    />
                    <PrivateRoute exact path="/logout" component={Logout} />
                  </Fragment>
                )}
                <Route component={NotFound} />
              </Switch>
            </div>
          </Container>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    notLoggedIn: isEmpty(authedUser) || isEmpty(questions),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
