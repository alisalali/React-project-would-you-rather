import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import User from "./User";

class Navi extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        {authedUser && (
          <Navbar color="light" light expand="lg">
            <Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/add">
                      New Question
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/leaderboard">
                      LeaderBoard
                    </NavLink>
                  </NavItem>

                  <NavItem className="navbar-text float-right">
                    <User id={authedUser} />
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/logout">
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Fragment>
          </Navbar>
        )
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Navi)
);
