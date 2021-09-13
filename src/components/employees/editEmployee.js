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
import { GET_DEPARTMENTS } from "../departments/queries";
import { GET_GRADES } from "../grade/queries";
import { GET_COURSES } from "../course/queries";
import { GET_TITLES } from "../title/queries";
import { GET_EMPLOYERS } from "../employer/queries";
import TitlesDropdown from "../dropdowns/listJobTitles";
import EmployersDropdown from "../dropdowns/listManagers";
import DepartmentDropDown from "../dropdowns/listDepartments";
import CoursesDropdown from "../dropdowns/listCourses";
import GradeDropdown from "../dropdowns/listGrades";
import DeleteModal from "../modals/toDelete";



export default function EditEmployee({ props }) {


  const typeOptions = [
    { key: "F", text: "Full-Time", value: "F" },
    { key: "P", text: "Part-Time", value: "P" },
    { key: "C", text: "Contract", value: "C" },
    { key: "L", text: "Laid Off", value: "L" },
  ];

  const options = [
    { key: "M", text: "Male", value: "M" },
    { key: "F", text: "Female", value: "F" },
  ];

  const timeOptions = [
    { key: "D", text: "Daily", value: "D" },
    { key: "W", text: "Weekly", value: "W" },
    { key: "M", text: "Monthly", value: "M" },
    { key: "Y", text: "Yearly", value: "Y" }
  ]
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
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({
    search: "", page: 1, limit: 10
  });

  const [grades, setGrades] = useState();
  const [selectedGrades, setSelectedGrades] = useState({
    search: "", page: 1, limit: 10
  });

  const [courses, setCourses] = useState();
  const [selectedCourses, setSelectedCourses] = useState({
    search: "", page: 1, limit: 10
  });

  const [titles, setTitles] = useState();
  const [selectedTitles, setSelectedTitles] = useState({
    search: "", page: 1, limit: 10
  });

  const [employers, setEmployers] = useState();
  const [selectedEmployers, setSelectedEmployers] = useState({
    search: "", page: 1, limit: 10
  });


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

  const { data: departmentData } = useQuery(GET_DEPARTMENTS, {
    variables: selectedDepartment
  });
  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData.departments.items);
    }
  }, [departmentData]);

  const { data: gradeData } = useQuery(GET_GRADES, {
    variables: selectedGrades
  });
  useEffect(() => {
    if (gradeData) {
      setGrades(gradeData.grades.items);
    }
  }, [gradeData]);

  const { data: courseData } = useQuery(GET_COURSES, {
    variables: selectedCourses
  });
  useEffect(() => {
    if (courseData) {
      setCourses(courseData.courses.items);
    }
  }, [courseData]);

  const { data: titleData } = useQuery(GET_TITLES, {
    variables: selectedTitles
  });
  useEffect(() => {
    if (titleData) {
      setTitles(titleData.titles.items);
    }
  }, [titleData]);

  const { data: employerData } = useQuery(GET_EMPLOYERS, {
    variables: selectedEmployers
  });
  useEffect(() => {
    if (employerData) {
      setEmployers(employerData.employers.items);
    }
  }, [employerData]);

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

  const handleOnDepartmentSearch = (e) => {
    setSelectedDepartment({ ...selectedDepartment, search: e.target.value })
  }
  const handleOnDepartmentChange = (e, { value }) => {
    e.preventDefault()
    const data = { department: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleOnGradeSearch = (e) => {
    setSelectedGrades({ ...selectedGrades, search: e.target.value })
  }
  const handleOnGradeChange = (e, { value }) => {
    e.preventDefault()
    const data = { grades: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleOnTitleSearch = (e) => {
    setSelectedTitles({ ...selectedTitles, search: e.target.value })
  }
  const handleOnTitleChange = (e, { value }) => {
    e.preventDefault()
    const data = { jobTitle: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleOnEmployerSearch = (e) => {
    setSelectedEmployers({ ...selectedEmployers, search: e.target.value })
  }
  const handleOnEmployerChange = (e, { value }) => {
    e.preventDefault()
    const data = { employerName: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleOnCourseSearch = (e) => {
    setSelectedCourses({ ...selectedCourses, search: e.target.value })
  }
  const handleOnCourseChange = (e, { value }) => {
    e.preventDefault()
    const data = { courses: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

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

  const [open, setOpen] = useState(false);
  const removeEmployee = (e) => {
    e.preventDefault()
    if (deleteEmployeeDetails.id) {
      setOpen(false)
      setDeleteEmployeeDetails({ id: employeeId, deleted: false })
      window.location.reload(true)
    }
  }

  useEffect(() => {
    if (!deleteEmployeeDetails.deleted && deleteEmployeeDetails.id) {
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
              {/* <Button id={values.id} icon floated='right' onClick={removeEmployee}>
                <Icon name='trash alternate' id={values.id} />
              </Button> */}
              <DeleteModal handleRemovalItem={removeEmployee} />
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
                  <span className="date">{employee.jobTitle ? employee.jobTitle.titleName : 'no job'}</span>
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
                    <Table.Cell>Employee Number</Table.Cell>
                    <Table.Cell>
                      <Form.Field required error={errors.errorPaths.includes('employeeNumber')}>
                        <Form.Input
                          fluid
                          placeholder="Employee Number"
                          name="employeeNumber"
                          onChange={onChange}
                        />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
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
                      <Form.Field error={errors.errorPaths.includes('gender')}>
                        <Form.Select
                          fluid
                          placeholder="Gender"
                          name="gender"
                          selection
                          options={options}
                          onChange={onChange}
                          value={values.gender}

                        />
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
                      <Form.Field error={errors.errorPaths.includes('jobTitle')}>
                        {titles && <TitlesDropdown
                          titles={titles}
                          handleOnTitleSearch={handleOnTitleSearch}
                          handleOnTitleChange={handleOnTitleChange}
                          selected={values.jobTitle ? values.jobTitle.titleName : ""}
                        />}
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
                      <Form.Field error={errors.errorPaths.includes('employerDetails')}>
                        {employers && <EmployersDropdown
                          employers={employers}
                          handleOnEmployerSearch={handleOnEmployerSearch}
                          handleOnEmployerChange={handleOnEmployerChange}
                          selected={values.employerName ? values.employerName.businesName : ""}
                        />}
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Department</Table.Cell>
                    <Table.Cell>
                      <Form.Field error={errors.errorPaths.includes('department')}>
                        {departments && <DepartmentDropDown
                          departments={departments}
                          handleOnDepartmentSearch={handleOnDepartmentSearch}
                          handleOnDepartmentChange={handleOnDepartmentChange}
                          selected={values.department ? values.department.departmentName : ""}
                        />}
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
                      <Form.Field error={errors.errorPaths.includes('period')}>
                        <Form.Select
                          fluid
                          placeholder="Period"
                          name="period"
                          selection
                          options={timeOptions}
                          onChange={onChange}
                          value={values.period}

                        />
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
                      <Form.Field error={errors.errorPaths.includes('status')}>
                        <Form.Select
                          fluid
                          placeholder="Status"
                          name="status"
                          selection
                          options={typeOptions}
                          onChange={onChange}
                          value={values.status}

                        />
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
                      <Form.Field error={errors.errorPaths.includes('completedCourses')}>
                        {courses && <CoursesDropdown
                          courses={courses}
                          handleOnCourseSearch={handleOnCourseSearch}
                          handleOnCourseChange={handleOnCourseChange}
                          selected={values.completedCourses ? values.completedCourses.courseName : ""}
                        />}
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade</Table.Cell>
                    <Table.Cell>
                      <Form.Field error={errors.errorPaths.includes('grade')}>
                        {grades && <GradeDropdown
                          grades={grades}
                          handleOnGradeSearch={handleOnGradeSearch}
                          handleOnGradeChange={handleOnGradeChange}
                          selected={values.grade ? values.grade.gradeName : ""}
                        />}
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


