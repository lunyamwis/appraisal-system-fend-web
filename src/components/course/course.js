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

class Course extends Component {
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
              <h3>Course</h3>
            </Header>
            <Form.Input
              fluid
              label={<h5> Course name</h5>}
              placeholder="Course name"
              name="coursementname"
              required
            />
            <Form.Input
              fluid
              label={<h5>Course level</h5>}
              placeholder="Course level"
              name="courselevel"
              required
            />
            <Form.Button type="submit" color="teal" onClick={this.handleSubmit}>
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default Course;
