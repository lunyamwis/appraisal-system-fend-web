import { Link } from "react-router-dom";
import React, { useState,useContext,useEffect } from "react";
import {
  Card,
  Image,
  Button,
  Icon,
  Header,
  Table,
  Divider,
  Grid,
  Container,
  Segment,
  Loader,
} from "semantic-ui-react";
import "../root.scss";
import { useQuery } from '@apollo/react-hooks';
import { GET_EMPLOYER } from "./queries";
import { AuthContext } from "../../context/auth";
import { EmployerContext } from "../../context/employer";

export default function Employer({ props }) {
  const authContext = useContext(AuthContext);
  const [employer, setEmployer] = useState({});
  const context = useContext(EmployerContext);
  const employerId = props.computedMatch.params.employerId

  const { loading, data: employerData } = useQuery(GET_EMPLOYER, {
    variables: { id: employerId }
  });

  useEffect(() => {
    if (employerData) {
      setEmployer(employerData.employer);
    }
  }, [employerData, employer, context]);

  return (
    <Container textAlign="center" 
    centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
      {employer.id &&<Grid.Column>
          <div className="content-wrapper">
              <Header as='h4'>
                  <Header.Content>
                  <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/employer-records">Employer</a> {'>'} {employer.businessName}
                      <Header.Subheader>
                          Hey there {authContext.user.username}, you can review and edit details of {employer.businessName} here
                      </Header.Subheader>
                  </Header.Content>
              </Header>
          </div>
      </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {employer.id &&
          <Header id="form-hd" block>
          <Grid>
            <Grid.Column>
            <h3>Profile</h3>
            </Grid.Column>
            <Grid.Column width={15}>
            <Link to={`/performancemanager/edit-employer/${employer.id}`}>
              <Button floated="right">
                <Icon name="pencil alternate" />
              </Button>
            </Link>
            </Grid.Column>
          </Grid>
          </Header>}
          {employer.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{employer.businessName}</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                <Table.Row>
                  <Table.Cell>Business Name</Table.Cell>
                  <Table.Cell>{employer.businessName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Phone Numbers</Table.Cell>
                  <Table.Cell>{employer.phoneNumbers}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Website Link</Table.Cell>
                  <Table.Cell>{employer.websiteLink}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Address</Table.Cell>
                  <Table.Cell>{employer.address}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Contact Name</Table.Cell>
                  <Table.Cell>{employer.contactName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Contact PhoneNumber</Table.Cell>
                  <Table.Cell>{employer.contactPhoneNumber}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Contact Role</Table.Cell>
                  <Table.Cell>{employer.contactRole}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Location</Table.Cell>
                  <Table.Cell>{employer.location}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>In House Employer Details</Table.Cell>
                  <Table.Cell>{employer.employerDetails}</Table.Cell>
                </Table.Row>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
  