import { useHistory } from 'react-router-dom';
import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Form,
  Button,
  Grid,
  Icon,
  Divider,
  Container,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import "../root.scss";
import { EmployeePolicyContext } from "../../context/employee";
import { CREATE_EMPLOYEE } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { GET_DEPARTMENTS } from '../departments/queries';
import DepartmentDropdown from '../dropdowns/listDepartments';
import { GET_GRADES } from '../grade/queries';
import GradeDropdown from '../dropdowns/listGrades';
import { GET_COURSES } from '../course/queries';
import CoursesDropdown from '../dropdowns/listCourses';
import { GET_TITLES } from '../title/queries';
import TitlesDropdown from '../dropdowns/listJobTitles';
import { GET_EMPLOYERS } from '../employer/queries';
import EmployersDropdown from '../dropdowns/listManagers';
import DepartmentModal from '../modals/departmentModal';
import TitleModal from '../modals/titleModal';
import ManagerModal from '../modals/managerModal';
import CourseModal from '../modals/coursesModal';
import GradeModal from '../modals/gradeModal';

export default function AddNewEmployee({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(EmployeePolicyContext);
  const [successMsg, setSuccessMsg] = useState();
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

  const [responseErrors, setResponseErrors] = useState([]);
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
    {key:"D",text:"Daily",value:"D"},
    {key:"W",text:"Weekly",value:"W"},
    {key:"M",text:"Monthly",value:"M"},
    {key:"Y",text:"Yearly",value:"Y"}
  ]

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,

  });

  let schema = yup.object().shape({
    status: yup.string().required("Please indicate status of client"),
    gender: yup.string().required("Please indicate gender"),
    firstName: yup.string().required("Please provide the first name"),
    employeeNumber:yup.string().required("Please enter the employee number"),
    lastName: yup.string().required("Please provide the last name"),
    otherNames: yup.string().required("Please provide other names"),
    email: yup.string(),
    address: yup.string(),
    phoneNumbers: yup.string(),
    emergencyNumbers: yup.string(),
    dateOfBirth: yup.date().required("Please provide us with date of birth"),
    jobTitle: yup.string(),
    employerName: yup.string(),
    department: yup.object().required("Please indicate the departments the employee belongs to."),
    hiringDate: yup.date().required("Please set the date you were hired"),
    currentSalary: yup.number().required("Please set the current salary"),
    startingSalary: yup.number().required("Please set the starting salary"),
    qualifications: yup.string(),
    completedCourses: yup.string(),
    rateHour: yup.number(),
    period: yup.string(),
    perPeriod: yup.number(),
    grade: yup.string().required("Please select the pay grade that this employee belongs to"),
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


  const [addEmployee, { loading }] = useCallback(useMutation(CREATE_EMPLOYEE, {
    update(_, result) {
      setVisible(false);
      let employeeData = result.data.createEmployee.employee
      context.createEmployee(employeeData);
      window.location.reload(true)

      setSuccessMsg('Successfully Registered New Employee');
    },
    onError(err) {
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
    variables: values
  }));


  const validate = useCallback((values) => {
    schema.validate(values, { abortEarly: false })
      .then(valid => setErrors({ errorPaths: [], errors: [] })) //called if the entire form is valid
      .catch(err => {
        setErrors({ errors: err.errors, errorPaths: err.inner.map(i => i.path) })
      })
  }, [schema])

  useEffect(() => {
    if (values.updated) {
      setValues({ ...values, updated: false })
      if (values.afterSubmit) {
        validate(values)
      }
    }
  }, [values, validate])

  const onPhoneNumberChange = useCallback((value) => {
    setValues({ ...values, phoneNumbers: "+" + value, updated: true });
  }, [values])

  const onEmergencyNumberChange = useCallback((value) => {
    setValues({ ...values, emergencyNumbers: "+" + value, updated: true });
  }, [values])

  const onChange = useCallback((event, { name, value }) => {
    setValues({ ...values, [name]: value, updated: true });
  }, [values])

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

  const handleAddDepartments = useCallback((e) => {
    e.preventDefault()
  })


  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setSuccessMsg('');
    validate(values)
    setValues({ ...values, afterSubmit: true })
    if (Object.keys(values).length > 7 && !errors.errors.length) { addEmployee() }
    setVisible(false);
  }


  return (
    <div className=".app-container">
      <Container
        textAlign="center"
        id="form-cont"
      >
        <Grid container padded>
          <Grid.Column>
            <div className="content-wrapper">
              <Header as='h4'>
                <Icon name='settings' />
                <Header.Content>
                  <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/employee-records">Employees</a> {'>'} Register New Employee
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new employee
          </Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          </Grid.Column>
        </Grid>
        {successMsg ?
          <Message
            positive
            onDismiss={handleDismiss}
            header='status'
            content={successMsg} /> :
          ''}
        <Segment id="form-seg">
          <Form id="form" onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
            <Form.Group>
              <Message visible={!!errors.errors.length || visible} warning>
                <Message.Header>Please correct the following issues:</Message.Header>
                {!!responseErrors.length && <Message>{responseErrors}</Message>}
                {<Message.List items={errors.errors} />}
              </Message>
            </Form.Group>
            <Header id="form-hd" block>
              <h3>Personal Information</h3>
            </Header>
            <Form.Group widths="equal">
            <Form.Field required error={errors.errorPaths.includes('employeeNumber')}>
                <label>Employee Number</label>
                <Form.Input
                  fluid
                  placeholder="Employee Number"
                  name="employeeNumber"
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field required error={errors.errorPaths.includes('firstName')}>
                <label>First Name</label>
                <Form.Input
                  fluid
                  placeholder="First name"
                  name="firstName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('lastName')}>
                <label>Last Name</label>
                <Form.Input
                  fluid
                  placeholder="Last name"
                  name="lastName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('otherNames')}>
                <label>Other Names</label>
                <Form.Input
                  fluid
                  placeholder="Other name"
                  name="otherNames"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>


            <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('gender')}>
                <label>Gender</label>
                <Form.Select
                  fluid
                  options={options}
                  name="gender"
                  placeholder="Gender"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('dateOfBirth')}>
                <label>Date Of Birth</label>

                <DateInput
                  name="dateOfBirth"
                  autoComplete="off"
                  placeholder="Date Of Birth"
                  popupPosition="bottom left"
                  value={values.dateOfBirth ? values.dateOfBirth : ""}
                  iconPosition="left"
                  dateFormat="YYYY-MM-DD"
                  maxDate={moment()}
                  onChange={onChange}
                />
              </Form.Field>

            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('email')}>
                <label>Email Address</label>
                <Form.Input
                  fluid
                  placeholder="Email address"
                  name="email"
                  type="email"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('address')}>
                <label>Address</label>
                <Form.Input
                  fluid
                  placeholder="Address"
                  name="address"
                  onChange={onChange}
                  required
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">

              <Form.Field error={errors.errorPaths.includes('phoneNumbers')}>

                <PhoneInput
                  inputExtraProps={{
                    name: "phoneNumbers",
                    required: true,
                    autoFocus: true,
                    enableSearch: true
                  }}
                  style={{ fontWeight: "bold" }}
                  name='phoneNumbers'
                  specialLabel='Phone Numbers *'
                  country={"ke"}
                  value={values.phoneNumbers}
                  onChange={onPhoneNumberChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('emergencyNumbers')}>

                <PhoneInput
                  inputExtraProps={{
                    name: "emergencyNumbers",
                    required: true,
                    autoFocus: true,
                    enableSearch: true
                  }}
                  style={{ fontWeight: "bold" }}
                  name='emergencyNumbers'
                  specialLabel='Emergency Numbers *'
                  country={"ke"}
                  value={values.emergencyNumbers}
                  onChange={onEmergencyNumberChange}
                />
              </Form.Field>


            </Form.Group>
            <Divider />
            <Header id="form-hd" block>
              <h3>Job Details</h3>
            </Header>
            <Form.Group widths="equal">
            <Form.Field error={errors.errorPaths.includes('period')}>
                  <label>Period</label>
                  <Form.Select
                    fluid
                    placeholder="Period"
                    name="period"
                    selection
                    options={timeOptions}
                    onChange={onChange}

                  />
                </Form.Field>
              <Form.Field error={errors.errorPaths.includes('perPeriod')}>
                <label>Per Period</label>
                <Form.Input
                  fluid
                  placeholder="Per_period"
                  name="per_period"
                  type="number"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('rateHour')}>
                <label>Hourly Rate</label>
                <Form.Input
                  fluid
                  placeholder="rate per hour"
                  name="rateperhour"
                  type="number"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              
              <Form.Field required error={errors.errorPaths.includes('hiringDate')}>
                <label>Date Of Hire</label>

                <DateInput
                  name="hiringDate"
                  autoComplete="off"
                  placeholder="Date Of Hire"
                  popupPosition="bottom left"
                  value={values.hiringDate ? values.hiringDate : ""}
                  iconPosition="left"
                  dateFormat="YYYY-MM-DD"
                  maxDate={moment()}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field error={errors.errorPaths.includes('jobTitle')}>
                <label>Job Title</label>
                {titles && <TitlesDropdown
                  titles={titles}
                  handleOnTitleSearch={handleOnTitleSearch}
                  handleOnTitleChange={handleOnTitleChange}
                />}
              </Form.Field>
              <TitleModal/>
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Field error={errors.errorPaths.includes('currentSalary')}>
                  <label>Current Salary</label>
                  <Form.Input
                    fluid
                    placeholder="Current salary"
                    name="currentSalary"
                    type="number"
                    step="1"
                    onChange={onChange}
                  />
                </Form.Field>
              <Form.Field error={errors.errorPaths.includes('department')}>
                <label>Department</label>
                {departments && <DepartmentDropdown
                  departments={departments}
                  handleOnDepartmentSearch={handleOnDepartmentSearch}
                  handleOnDepartmentChange={handleOnDepartmentChange}

                />}
              </Form.Field>
              <DepartmentModal/>  
              </Form.Group>
              <Form.Group widths="equal">
                

                <Form.Field error={errors.errorPaths.includes('startingSalary')}>
                  <label>Starting Salary</label>
                  <Form.Input
                    fluid
                    placeholder="Starting salary"
                    name="startingSalary"
                    type="number"
                    step="1"
                    onChange={onChange}
                  />
                </Form.Field>
                <Form.Field error={errors.errorPaths.includes('employerName')}>
                <label>Managers</label>
                {employers && <EmployersDropdown
                  employers={employers}
                  handleOnEmployerSearch={handleOnEmployerSearch}
                  handleOnEmployerChange={handleOnEmployerChange}
                />}
              </Form.Field>
              <ManagerModal/>
              </Form.Group>


              <Form.Group widths="equal">
                <Form.Field error={errors.errorPaths.includes('status')}>
                  <label>Status</label>
                  <Form.Select
                    fluid
                    placeholder="Employee status"
                    name="status"
                    selection
                    options={typeOptions}
                    onChange={onChange}

                  />
                </Form.Field>
                <Form.Field error={errors.errorPaths.includes('course')}>
                  <label>Courses</label>
                  {courses && <CoursesDropdown
                    courses={courses}
                    handleOnCourseSearch={handleOnCourseSearch}
                    handleOnCourseChange={handleOnCourseChange}
                  />}
                </Form.Field>
                <CourseModal/>
              </Form.Group>

              <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('qualifications')}>
                  <label>Qualifications</label>
                  <Form.Input
                    fluid
                    placeholder="Qualifications"
                    name="qualifications"
                    onChange={onChange}
                  />
                </Form.Field>
                <Form.Field error={errors.errorPaths.includes('grade')}>
                  <label>Grade</label>
                  {grades && <GradeDropdown
                    grades={grades}
                    handleOnGradeSearch={handleOnGradeSearch}
                    handleOnGradeChange={handleOnGradeChange}
                  />}
                </Form.Field>
                <GradeModal/>
              </Form.Group>
              <Button
                type="submit"
                color="teal"
              >
                Submit
              </Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}
