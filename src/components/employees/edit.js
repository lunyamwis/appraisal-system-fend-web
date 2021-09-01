import React, { Component, useState } from "react";
import { Link, navigate } from "@reach/router";
import {
  Form,
  Grid,
  Button,
  Modal,
  Image,
  Checkbox,
  Icon,
  Divider,
  Dropdown,
  Container,
  Segment,
  Header,
} from "semantic-ui-react";
import "../root.scss";
import Department from "../departments/department";
import Title from "../title/title";
import Employer from "../employer/employer";
import Course from "../course/course";
import Grade from "../grade/grade";

const status = [
  { key: "full-time", text: "Full-Time", value: "full-time" },
  { key: "part-time", text: "Part-Time", value: "part-time" },
  { key: "seasonal", text: "seasonal", value: "seasonal" },
  { key: "temporary", text: "temporary", value: "temporary" },
];

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
];

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  render() {
    return (
      <div className=".app-container">
        <Container
          textAlign="center"
          style={{ height: "100vh" }}
          id="form-cont"
          verticalAlign="middle"
        >
          <Header as="h2" color="teal" textAlign="center">
            <Icon
              name="users"
              className="ui teal"
              id="employee-icon"
              circular
            />
          </Header>
          <Segment id="form-seg">
            <Form id="form">
              <Header id="form-hd" block>
                <h3>Personal Information</h3>
              </Header>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>First name</h5>}
                  placeholder="First name"
                  name="firstname"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Last name</h5>}
                  placeholder="Last name"
                  name="lastName"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Other name</h5>}
                  placeholder="Other name"
                  name="othername"
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<h5>Gender</h5>}
                  options={options}
                  placeholder="Gender"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Date of birth</h5>}
                  placeholder="Date of birth"
                  name="dateofbirth"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Email address</h5>}
                  placeholder="Email address"
                  name="emailaddress"
                  type="email"
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
                  label={<h5>Phone number</h5>}
                  placeholder="Phone number"
                  name="phonenumber"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Emergency contact</h5>}
                  placeholder="Emergency contact"
                  name="emergencycontact"
                  required
                />
              </Form.Group>
              <Divider />
              <Header id="form-hd" block>
                <h3>Job Details</h3>
              </Header>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Job title</h5>}
                  placeholder="Job Title"
                  name="jobtitle"
                  action={<Title />}
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Date of hire</h5>}
                  placeholder="Date of hire"
                  name="dateofhire"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Manager</h5>}
                  placeholder="Manager"
                  name="manager"
                  action={<Employer />}
                  required
                />

                <Form.Input
                  fluid
                  label={<h5>Department</h5>}
                  placeholder="Department"
                  name="department"
                  action={<Department />}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Current salary</h5>}
                  placeholder="Current salary"
                  name="currentsalary"
                  type="number"
                  step="1"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Starting salary</h5>}
                  placeholder="Starting salary"
                  name="startingsalary"
                  type="number"
                  step="1"
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Period</h5>}
                  placeholder="Period"
                  name="period"
                  type="number"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Per_period</h5>}
                  placeholder="Per_period"
                  name="per_period"
                  type="number"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Rate per hour</h5>}
                  placeholder="rate per hour"
                  name="rateperhour"
                  type="number"
                  required
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label={<h5>Employee status</h5>}
                  placeholder="Employee status"
                  name="employeestatus"
                  selection
                  options={status}
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Qualifications</h5>}
                  placeholder="Qualifications"
                  name="qualifications"
                  required
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Completed courses</h5>}
                  placeholder="Completed courses"
                  name="completedcourses"
                  action={<Course />}
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Employee grade</h5>}
                  placeholder="Employee grade"
                  name="employeegrade"
                  action={<Grade />}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label={<h5>Reviews</h5>}
                  placeholder="Reviews"
                  name="reviews"
                  required
                />
                <Form.Input
                  fluid
                  label={<h5>Recommendations</h5>}
                  placeholder="Recommendations"
                  name="recommendations"
                  required
                />
              </Form.Group>
              <Form.Button
                type="submit"
                color="teal"
                onClick={this.handleSubmit}
              >
                Submit
              </Form.Button>
            </Form>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default Edit;
