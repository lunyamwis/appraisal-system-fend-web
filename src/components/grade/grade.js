import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Container,
  Form,
  Segment,
  Image,
  Modal,
} from "semantic-ui-react";
import "../root.scss";
import { navigate } from "@reach/router";

class Grade extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.open === true) {
      this.props.onClose();
    } else {
      navigate("/");
    }
  };

  render() {
    return (
      <Container textAlign="center" id="form-cont" verticalAlign="middle">
        <Segment id="form-seg" textAlign="center">
          <Form id="form">
            <Header id="form-hd" block>
              <h3>Grade</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Grade name</h5>}
                placeholder="Grade name"
                name="gradename"
                required
              />
              <Form.Input
                fluid
                label={<h5>Grade basic</h5>}
                placeholder="Grade basic"
                name="gradebasic"
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label={<h5>Grade_da</h5>}
                placeholder="Grade_da"
                name="grade_da"
                required
              />
              <Form.Input
                fluid
                label={<h5>Grade_ta</h5>}
                placeholder="Grade_ta"
                name="grade_ta"
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Grade bonus</h5>}
                placeholder="Grade bonus"
                name="gradebonus"
                required
              />
              <Form.Input
                fluid
                label={<h5>Grade pf</h5>}
                placeholder="Grade pf"
                name="gradepf"
                required
              />
            </Form.Group>
            <Form.Button type="submit" color="teal" onClick={this.handleSubmit}>
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default Grade;
