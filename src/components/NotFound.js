import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
export class NotFound extends Component {
  render() {
    return (
      <div>
        Page Not Found !!!
        <Button color="link">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    );
  }
}

export default NotFound;
