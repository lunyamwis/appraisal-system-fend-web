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
  Loader,
  List,
} from "semantic-ui-react";
import "../root.scss";
import { useQuery } from '@apollo/react-hooks';
import { EmployeePolicyContext } from "../../context/employee";
import { GET_EMPLOYEE } from "./queries";
import { AuthContext } from "../../context/auth";


export default function Employee({ props }) {
  const authContext = useContext(AuthContext);
  const [employee, setEmployee] = useState({});
  const context = useContext(EmployeePolicyContext);
  const employeeId = props.computedMatch.params.employeeId

  const { loading, data: employeeData } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId }
  });

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData.employee);
    }
  }, [employeeData, employee, context]);


  return (
    <Container textAlign="center"
      centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
        {employee.id && <Grid.Column>
          <div className="content-wrapper">
            <Header as='h4'>
              <Header.Content>
                <a href="/performancemanager">Home</a> {'>'}  <a href="/performancemanager/employee-records">Employees</a> {'>'} {employee.firstName}
                <Header.Subheader>
                  Hey there {authContext.user.username}, you can review and edit details of {employee.firstName} here
                      </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {employee.id &&
            <Header id="form-hd" block>
              <Grid>
                <Grid.Column>
                  <h3>Profile</h3>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Link to={`/performancemanager/edit-employee/${employee.id}`}>
                    <Button floated="right">
                      <Icon name="pencil alternate" />
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid>
            </Header>}
          {employee.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{employee.firstName}</Card.Header>
                  <Card.Meta id="profile-met">
                    <span className="date">{employee.jobTitle ? employee.jobTitle.titleName : 'no job'}</span>
                  </Card.Meta>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>First Name</Table.Cell>
                    <Table.Cell>{employee.firstName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Name</Table.Cell>
                    <Table.Cell>{employee.lastName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Other Names</Table.Cell>
                    <Table.Cell>{employee.otherNames}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Gender</Table.Cell>
                    <Table.Cell>{employee.gender}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Date Of Birth</Table.Cell>
                    <Table.Cell>{employee.dateOfBirth}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Email</Table.Cell>
                    <Table.Cell>{employee.email}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>{employee.address}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Phone Number</Table.Cell>
                    <Table.Cell>{employee.phoneNumbers}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Emergency Numbers</Table.Cell>
                    <Table.Cell>{employee.emergencyNumbers}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Job Title</Table.Cell>
                    <Table.Cell>{employee.jobTitle ? employee.jobTitle.titleName : 'no job'}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{employee.hiringDate}</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Employer</Table.Cell>
                    <Table.Cell>{employee.employerName ? employee.employerName.businessName : 'no employer'}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Department</Table.Cell>
                    <Table.Cell>{employee.department.length &&
                      <List divided relaxed>
                        {employee.department.map((dept, key) => (
                          <List.Item key={key}>
                            <List.Icon name='users' size='large' verticalAlign='middle' />
                            <List.Content>
                              <List.Header>
                                <Link key={key} to={`/performancemanager/department/${dept.id}`}>
                                  <span style={{ fontSize: ".9em" }}><span className='price'>{dept.departmentName}</span><br /></span>
                                </Link>
                              </List.Header>
                              <List.Description as='a'>{dept.departmentName}</List.Description>
                            </List.Content>
                          </List.Item>))}
                      </List>}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Current Salary</Table.Cell>
                    <Table.Cell>{employee.currentSalary}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Starting Salary</Table.Cell>
                    <Table.Cell>{employee.startingSalary}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Period</Table.Cell>
                    <Table.Cell>{employee.period}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Payment Per Period</Table.Cell>
                    <Table.Cell>{employee.perPeriod}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Hourly Rate</Table.Cell>
                    <Table.Cell>{employee.rateHour}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Status</Table.Cell>
                    <Table.Cell>{employee.status}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Qualifications</Table.Cell>
                    <Table.Cell>{employee.qualifications}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Courses</Table.Cell>
                    <Table.Cell>{employee.completedCourses ? employee.completedCourses.courseName : 'no completed courses'}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade</Table.Cell>
                    <Table.Cell>{employee.grade ? employee.grade.gradeName : 'no grade available'}</Table.Cell>
                  </Table.Row>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
