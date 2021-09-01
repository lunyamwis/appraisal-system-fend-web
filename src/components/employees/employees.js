import React, { Component } from "react";
import {
  Container,
  Card,
  Header,
  Item,
  Label,
  Popup,
  Table,
  Segment,
  Input,
  Grid,
  Icon,
  Image,
  Button,
} from "semantic-ui-react";
import "../root.scss";
import { Link, navigate } from "@reach/router";

class Employees extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => navigate("/details");
  render() {
    return (
      <div fluid>
        <Container className="employee-container">
          <Header as="h2" icon textAlign="center">
            <Icon name="users" className="ui teal" circular />
            <Header.Content>Employees</Header.Content>
          </Header>
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Job Title</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Department</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Email</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Contact</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Link id="tb-link" to="/profile">
                    Martin
                  </Link>
                </Table.Cell>
                <Table.Cell>Back-end Engineer</Table.Cell>
                <Table.Cell>Development</Table.Cell>
                <Table.Cell>mart3@yahoo.com</Table.Cell>
                <Table.Cell>0090019</Table.Cell>
                <Table.Cell>Full-Time</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Link id="tb-link" to="/profile">
                    Martin
                  </Link>
                </Table.Cell>
                <Table.Cell>Back-end Engineer</Table.Cell>
                <Table.Cell>Development</Table.Cell>
                <Table.Cell>mart3@yahoo.com</Table.Cell>
                <Table.Cell>0090019</Table.Cell>
                <Table.Cell>Full-Time</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Link id="tb-link" to="/profile">
                    Martin
                  </Link>
                </Table.Cell>
                <Table.Cell>Back-end Engineer</Table.Cell>
                <Table.Cell>Development</Table.Cell>
                <Table.Cell>mart3@yahoo.com</Table.Cell>
                <Table.Cell>0090019</Table.Cell>
                <Table.Cell>Full-Time</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Link id="tb-link" to="/profile">
                    Martin
                  </Link>
                </Table.Cell>
                <Table.Cell>Back-end Engineer</Table.Cell>
                <Table.Cell>Development</Table.Cell>
                <Table.Cell>mart3@yahoo.com</Table.Cell>
                <Table.Cell>0090019</Table.Cell>
                <Table.Cell>Full-Time</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Link id="tb-link" to="/profile">
                    Martin
                  </Link>
                </Table.Cell>
                <Table.Cell>Back-end Engineer</Table.Cell>
                <Table.Cell>Development</Table.Cell>
                <Table.Cell>mart3@yahoo.com</Table.Cell>
                <Table.Cell>0090019</Table.Cell>
                <Table.Cell>Full-Time</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Popup
            content="add an employee"
            trigger={
              <Button
                className="ui primary"
                id="float"
                onClick={this.handleClick}
                centered
              >
                <Icon className="ui large" name="add user" />
              </Button>
            }
          />
        </Container>
      </div>
    );
  }
}

export default Employees;
