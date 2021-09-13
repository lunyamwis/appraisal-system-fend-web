import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
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
  List,
  Loader,
} from "semantic-ui-react";
import "../root.scss";
import { useQuery } from '@apollo/react-hooks';
import { GET_DEPARTMENT } from "./queries";
import { AuthContext } from "../../context/auth";
import { DepartmentContext } from "../../context/department";


export default function Department({ props }) {
  const authContext = useContext(AuthContext);
  const [department, setDepartment] = useState({});
  const context = useContext(DepartmentContext);
  const departmentId = props.computedMatch.params.departmentId

  const { loading, data: departmentData } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId }
  });

  useEffect(() => {
    if (departmentData) {
      setDepartment(departmentData.department);
    }
  }, [departmentData, department, context]);

  return (
    <Container textAlign="center"
      centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
        {department.id && <Grid.Column>
          <div className="content-wrapper">
            <Header as='h4'>
              <Header.Content>
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/department-records">Departments</a> {'>'} {department.departmentName}
                <Header.Subheader>
                  Hey there {authContext.user.username}, you can review and edit details of {department.departmentName} here
                      </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {department.id &&
            <Header id="form-hd" block>
              <Grid>
                <Grid.Column>
                  <h3>Profile</h3>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Link to={`/performancemanager/edit-department/${department.id}`}>
                    <Button floated="right">
                      <Icon name="pencil alternate" />
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid>
            </Header>}
          {department.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{department.departmentName}</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>Department Name</Table.Cell>
                    <Table.Cell>{department.departmentName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Pay Grade</Table.Cell>
                    <Table.Cell>{department.payGrade?department.payGrade.gradeName:null}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                  <Table.Cell>Sub Departments</Table.Cell>
                  <Table.Cell>{department.subDepartments.length &&
                      <List divided relaxed>
                        {department.subDepartments.map((dept, key) => (
                          <List.Item key={key}>
                            <List.Icon name='users' size='large' verticalAlign='middle' />
                            <List.Content>
                              <List.Header>
                                  <span style={{ fontSize: ".9em" }}><span className='price'>{dept.name}</span><br /></span>
                              </List.Header>
                              <List.Description as='a'>{dept.name}</List.Description>
                            </List.Content>
                          </List.Item>))}
                      </List>}</Table.Cell>
                  </Table.Row>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
