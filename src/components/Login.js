import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({ userId: event.target.value });
  }

  handleSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      authenticate(userId);
    } else {
      alert("Please select a user before.");
    }
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="userSelect">Select User :</Label>
              <Input
                id="userSelect"
                type="select"
                name="select"
                value={userId}
                onChange={this.handleChangeUser}
              >
                <option value="" disabled>
                  Please select the user
                </option>
                {Object.keys(users).map(user => (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button color="primary w-100">Login</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: id => {
      dispatch(setAuthedUser(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
