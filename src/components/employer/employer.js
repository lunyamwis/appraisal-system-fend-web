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

class Employer extends Component {
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
              <h3>Employer Details</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Business name</h5>}
                placeholder="Business Name"
                name="businessName"
                required
              />
              <Form.Input
                fluid
                label={<h5>Phone number</h5>}
                placeholder="Phone Number"
                name="phoneNumber"
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Website</h5>}
                placeholder="Website"
                name="website"
                required
              />
              <Form.Input
                fluid
                label={<h5>Address</h5>}
                placeholder="Address"
                name="address"
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Contact-person name</h5>}
                placeholder="Contact-person name"
                name="contactpersonname"
                required
              />
              <Form.Input
                fluid
                label={<h5>Contact-person role</h5>}
                placeholder="Contact-person role"
                name="contactpersonrole"
                required
              />
              <Form.Input
                fluid
                label={<h5>Contact-person phone</h5>}
                placeholder="Contact-person phone"
                name="contactpersonphone"
                type="number"
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>User representation</h5>}
                placeholder="User representation"
                name="userrepresentation"
                required
              />
              <Form.Input
                fluid
                label={<h5>Location</h5>}
                placeholder="Location"
                name="location"
                required
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Industry</h5>}
                placeholder="Industry"
                name="industry"
                required
              />
              <Form.Input
                fluid
                label={<h5>Size</h5>}
                placeholder="Size"
                name="size"
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

export default Employer;
