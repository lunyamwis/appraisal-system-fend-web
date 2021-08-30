import React, { useState, useContext, useEffect, useCallback } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Grid,
  Container,
  Segment,
  Table,
  Input,
  Message,
  Header,
  Icon,
  Card,
  Image
} from "semantic-ui-react";
import "../root.scss";
import { EmployeePolicyContext } from "../../context/employee";
import { UPDATE_EMPLOYEE, GET_EMPLOYEE, DELETE_EMPLOYEE } from "./queries";



export default function EditEmployee({ props }) {

  const status = [
    { key: "F", text: "Full-Time", value: "full-time" },
    { key: "part-time", text: "Part-Time", value: "part-time" },
    { key: "seasonal", text: "seasonal", value: "seasonal" },
    { key: "temporary", text: "temporary", value: "temporary" },
  ];

  const options = [
    { key: "M", text: "Male", value: "M" },
    { key: "F", text: "Female", value: "F" },
  ];

  const employeeId = props.computedMatch.params.employeeId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [employee, setEmployee] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(EmployeePolicyContext);
  const [toDelete, setToDelete] = useState({ employee: [] });
  const [deleteEmployeeDetails, setDeleteEmployeeDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    status: "",
    gender: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    address: "",
    phoneNumbers: "",
    emergencyNumbers: "",
    dateOfBirth: "",
    jobTitle: null,
    employerName: null,
    department: null,
    hiringDate: "",
    currentSalary: 5441,
    startingSalary: 2456,
    qualifications: "",
    completedCourses: null,
    rateHour: 54.23,
    period: "",
    perPeriod: 2,
    grade: null

  });

  const { data: employeeData } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId }
  });

  useEffect(() => {
    if (!values.fetched && employeeData) {
      let data = employeeData.employee
      setValues({ ...values, ...data, update: true, fetched: true, id: employeeId });
      setToDelete({ ...toDelete, id: employeeId })
      delete data.id

    }
  }, [employeeData, context, values, employeeId, toDelete]);

  const [deleteAnEmployee, { data: deletedEmployee }] = useMutation(DELETE_EMPLOYEE, {
    onError(err) {

      // { err.networkError ? console.log(err.networkError.result) : console.log(err.graphQLErrors) }


      try {
        if (err.graphQLErrors) {

          setResponseErrors(err.graphQLErrors[0].message);

        }

        if (err.networkError !== null && err.networkError !== 'undefined') {

          setResponseErrors(err.networkError.result.errors[0]);

        } else if (err.graphQLErrors !== null && err.networkError !== 'undefined') {

          setResponseErrors(err.graphQLErrors.result.errors[0]);

        }
      } catch (e) {
        setVisible(true);
      }
    },
    variables: { id: deleteEmployeeDetails.id }
  })

  useEffect(() => {
    if (deletedEmployee) {
      console.log(deletedEmployee)
    }
  })

  const [updateEmployee, { loading }] = useCallback(useMutation(UPDATE_EMPLOYEE,
    {
      update(_, result) {
        context.updateEmployee(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setEmployee(result.data.updateEmployee.employee)

        setValues({ ...values, done: true });
      },
      onError(err) {

        // { err.networkError ? console.log(err.networkError.result) : console.log(err.graphQLErrors) }


        try {
          if (err.graphQLErrors) {
            setResponseErrors(err.graphQLErrors[0].message);
          }

          if (err.networkError !== null && err.networkError !== 'undefined') {

            setResponseErrors(err.networkError.result.errors[0]);

          } else if (err.graphQLErrors !== null && err.networkError !== 'undefined') {

            setResponseErrors(err.graphQLErrors.result.errors[0]);

          }
        } catch (e) {
          setVisible(true);
        }
      },
      variables: values,
    }));


  const removeEmployee = () => {
    if (Object.keys(values.id).length) {
      setDeleteEmployeeDetails({ id: toDelete.id, deleted: false })
    }
  }

  useEffect(() => {
    if (!deleteEmployeeDetails.deleted && deleteEmployeeDetails.id.length) {
      deleteAnEmployee()
      setDeleteEmployeeDetails({ ...deleteEmployeeDetails, deleted: true, id: [] })
    }

  }, [deleteAnEmployee, deleteEmployeeDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (Object.keys(values).length > 7 && !errors.errors.length) { updateEmployee() }
    removeEmployee();
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/employee/${employee.id}`,
        state: { employee }
      })
    }
  })

  return (
    <Container textAlign="center"
      centered="true" doubling="true" stackable="true">
      <Grid container>
        <Grid.Column>
          <div className="content-wrapper">
            <Header as='h4'>
              <Header.Content>
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/employee-records">Employees</a> {'>'}  <Link to={`/performancemanager/employee/${employeeId}`}> Policy </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit an Employee Details
                        </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Grid.Column>
      </Grid>
      {values.id && <Segment id="form-seg">
        <Header id="form-hd" block>
          <Grid>
            <Grid.Column>
              <h3>Edit</h3>
            </Grid.Column>
            <Grid.Column width={15}>
              <Button id={values.id}  icon floated='right' onClick={removeEmployee}>
                <Icon name='trash alternate' id={values.id}/>
              </Button>
            </Grid.Column>
          </Grid>
        </Header>
        <Grid>
          <Grid.Column width={6}>
            <Card id="card">
              <Card.Content>
                <Image
                  fluid
                  src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                  circular
                />
                <Card.Header id="profile-hd">{values.firstName}</Card.Header>
                <Card.Meta id="profile-met">
                  <span className="date">{values.jobTitle ? employee.jobTitle.titleName : 'no job'}</span>
                </Card.Meta>
                <Card.Description></Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <Form id="form" onSubmit={onSubmit} noValidate>
              <Form.Group>

                <Message visible={!!errors.errors.length || visible} warning>
                  <Message.Header>Please correct the following issues:</Message.Header>
                  {!!responseErrors.length && <Message>{responseErrors}</Message>}
                  {<Message.List items={errors.errors} />}
                </Message>
              </Form.Group>
              <Table striped id="profile-table">
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>First Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='First Name'
                          name="firstName" onChange={onChange}
                          value={values.firstName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Last Name'
                          name="lastName" onChange={onChange}
                          value={values.lastName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Other Names</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Other Names'
                          name="otherName" onChange={onChange}
                          value={values.otherNames} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Gender</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Gender'
                          name="gender" onChange={onChange}
                          value={values.gender} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Date Of Birth</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Date Of Birth'
                          name="dateOfBirth" type="date" onChange={onChange}
                          value={values.dateOfBirth} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Email</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Email'
                          name="email" onChange={onChange}
                          value={values.email} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Address'
                          name="address" onChange={onChange}
                          value={values.address} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Phone Number</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Phone Number'
                          name="phoneNumbers" onChange={onChange}
                          value={values.phoneNumbers} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Emergency Numbers</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Emergency Number'
                          name="emergencyNumbers" onChange={onChange}
                          value={values.emergencyNumbers} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Job Title</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Job Title'
                          name="jobTitle" onChange={onChange}
                          value={values.jobTitle ? values.jobTitle.titleName : ""} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Hiring Date</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Hiring Date'
                          name="hiringDate" type="date" onChange={onChange}
                          value={values.hiringDate} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Employer</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Employer'
                          name="employerName" onChange={onChange}
                          value={values.employerName ? values.employerName.businesName : " "} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Department</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Department'
                          name="department" onChange={onChange}
                          value={values.department ? values.department.departmentName : " "} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Current Salary</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Current Salary'
                          name="currentSalary" type="number" onChange={onChange}
                          value={values.currentSalary} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Starting Salary</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Starting Salary'
                          name="startingSalary" type="number" onChange={onChange}
                          value={values.startingSalary} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Period</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Period'
                          name="period" onChange={onChange}
                          value={values.period} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Payment Per Period</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Per Period'
                          name="perPeriod" type="number" onChange={onChange}
                          value={values.perPeriod ? values.perPeriod : ""} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Hourly Rate</Table.Cell>
                    <Table.Cell>{employee.rateHour}
                      <Form.Field>
                        <Input fluid placeholder='Hourly Rate'
                          name="hourlyRate" type="number" onChange={onChange}
                          value={values.rateHour ? values.rateHour : ""} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Status</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Status'
                          name="status" onChange={onChange}
                          value={values.status} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Qualifications</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Qualifications'
                          name="qualifications" onChange={onChange}
                          value={values.qualifications} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Courses</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Courses Completed'
                          name="completedCourses" onChange={onChange}
                          value={values.completedCourses ? values.completedCourses.courseName : " "} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade'
                          name="grade" onChange={onChange}
                          value={values.grade ? values.grade.gradeName : " "} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>

              </Table>

              <Button
                type="submit"
                color="teal"
              >
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>}
    </Container>
  );

}


