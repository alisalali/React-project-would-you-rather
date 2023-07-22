import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import User from "./User";
import { handleAnswer } from "../actions/shared";
import PropTypes from "prop-types";
import { Progress } from "reactstrap";
import NotFound from "./NotFound";

class QuestionDetails extends Component {
  state = {
    selectedOption: ""
  };

  radioSelected = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const {
      question,
      questionAuthor,
      answer,
      total,
      percentone,
      percenttwo
    } = this.props;
    const { selectedOption } = this.state;

    return (
      <Fragment>
        {question ? (
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card body>
                <CardHeader>
                  <User id={questionAuthor.id} />
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <h3>Would You Rather</h3>
                  </CardTitle>
                  {answer ? (
                    <div>
                      <FormGroup>
                        <FormGroup check disabled>
                          <Label check>
                            <Input
                              type="radio"
                              checked={answer === "optionOne"}
                              readOnly
                            />{" "}
                            {question.optionOne.text}
                          </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                          <Label check>
                            <Input
                              type="radio"
                              checked={answer === "optionTwo"}
                              readOnly
                            />{" "}
                            {question.optionTwo.text}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      <Progress multi>
                        <Progress bar color="warning" value={percentone}>
                          {question.optionOne.votes.length} is voted by
                          {percentone}%
                        </Progress>
                        <Progress bar color="info" value={percenttwo}>
                          {question.optionTwo.votes.length} is voted by
                          {percenttwo}%
                        </Progress>
                      </Progress>

                      <div className="badge badge-primary text-center">
                        Total number of votes:{" "}
                        <span className="badge badge-light">{total}</span>
                      </div>
                    </div>
                  ) : (
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup tag="fieldset">
                        <FormGroup>
                          <Label>
                            <Input
                              type="radio"
                              name="radio1"
                              value="optionOne"
                              onChange={this.radioSelected}
                            />{" "}
                            {question.optionOne.text}
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <Input
                              type="radio"
                              name="radio1"
                              value="optionTwo"
                              onChange={this.radioSelected}
                            />{" "}
                            {question.optionTwo.text}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      <Button
                        className="w-100"
                        color="primary"
                        disabled={selectedOption === ""}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <NotFound />
        )}
      </Fragment>
    );
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const { id } = match.params;

  const answers = users[authedUser].answers;
  let answer, percentone, percenttwo, total, questionAuthor;

  const question = questions[id];

  if (Object.keys(questions).includes(id)) {
    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id];
    }
    questionAuthor = users[question.author];
    total = question.optionOne.votes.length + question.optionTwo.votes.length;
    percentone = financial((question.optionOne.votes.length / total) * 100);
    percenttwo = financial((question.optionTwo.votes.length / total) * 100);
    return {
      question,
      questionAuthor,
      answer,
      total,
      percentone,
      percenttwo
    };
  } else
    return {
      question,
      questionAuthor,
      answer,
      total,
      percentone,
      percenttwo
    };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: answer => {
      dispatch(handleAnswer(id, answer));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
