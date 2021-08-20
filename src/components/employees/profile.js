import { Link } from "@reach/router";
import React, { Component } from "react";
import {
  Card,
  Image,
  Button,
  Icon,
  Header,
  Table,
  Search,
  Divider,
  Input,
  Grid,
  Container,
  Segment,
} from "semantic-ui-react";
import "../root.scss";

class Profile extends Component {
  render() {
    return (
      <Container textAlign="center" centered doubling stackable>
        <Segment>
          <Header id="form-hd" block>
            <h3>Profile</h3>
          </Header>
          <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">Martin</Card.Header>
                  <Card.Meta id="profile-met">
                    <span className="date">Back-end Engineer</span>
                  </Card.Meta>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Header>
                  <Table.HeaderCell id="table-hd"></Table.HeaderCell>
                  <Table.HeaderCell id="table-hd"></Table.HeaderCell>
                </Table.Header>
                <Table.Row>
                  <Table.Cell>First name</Table.Cell>
                  <Table.Cell contenteditable="true">Martin</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Last name</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Other name</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Gender</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Date of birth</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email address</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Address</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Phone number</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Emergency contact</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Job Title</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Date of hire</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Manager</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Department</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Current salary</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Starting salary</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Period</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Per_period</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Rate per hour</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Qualifications</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Completed courses</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Grade</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Recommendation</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table>
            </Grid.Column>
          </Grid>
          <Divider />
          <Button.Group className="ui teal">
            <Link to="/edit">
              <Button>
                <Icon name="pencil alternate" />
              </Button>
            </Link>
            <Button onClick={this.handleDelClick}>
              <Icon name="trash" />
            </Button>
          </Button.Group>
        </Segment>
      </Container>
    );
  }
}
export default Profile;
