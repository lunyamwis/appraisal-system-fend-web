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

class Dummy extends Component {
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
              <h3>Department</h3>
            </Header>
            <Form.Input
              fluid
              label={<h5> Department name</h5>}
              placeholder="Department name"
              name="departmentname"
              required
            />
            <Form.Input
              fluid
              label={<h5>Pay_grade</h5>}
              placeholder="Pay_grade"
              name="pay_grade"
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

export default Dummy;
