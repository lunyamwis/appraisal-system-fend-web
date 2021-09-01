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
import { GET_TITLES } from '../title/queries';
import DepartmentDropdown from '../dropdowns/listDepartments';
import TitleDropdown from '../dropdowns/listTitles';



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
  const [departments, setDepartments] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState({
    search: "", page: 1, limit: 10
  });
  const [titles, setTitles] = useState();
  const [selectedTitle, setSelectedTitle] = useState({
    search: "", page: 1, limit: 10
  })
  const [responseErrors, setResponseErrors] = useState([]);
  const status = [
    {
      key: 'F',
      text: 'Full Time',
      value: 'F'
    }

  ]
  const options = [
    {
      key: 'F',
      text: 'Female',
      value: 'F',
    },
    {
      key: 'M',
      text: 'Male',
      value: 'M',
    }
  ]

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,

  });

  let schema = yup.object().shape({
    status: yup.string().required("Please indicate status of client"),
    gender: yup.string().required("Please indicate gender"),
    firstName: yup.string().required("Please provide the first name"),
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
    grade: yup.string(),
  });

  const { data: departmentData } = useQuery(GET_DEPARTMENTS, {
    variables: selectedDepartment
  });
  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData.departments.items);
    }
  }, [departmentData]);//ask about this..

  console.log(departments)

  const { data: titleData } = useQuery(GET_TITLES, {
    variables: selectedTitle
  });
  useEffect(() => {
    if (titleData) {
      setTitles(titleData.titles.items);
    }
  }, [titleData]);

  const [addEmployee, { loading }] = useCallback(useMutation(CREATE_EMPLOYEE, {
    update(_, result) {
      setVisible(false);
      let employeeData = result.data.createEmployee.employee
      context.createEmployee(employeeData);
      history.push({
        pathname: `/performancemanager/employee/${employeeData.id}`,
        state: { employee: employeeData, employeeId: employeeData.id }
      })

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
  const handleOnTitleSearch = (e) => {
    setSelectedTitle({ ...selectedTitle, search: e.target.value })
  }
  const handleOnTitleChange = (e, { value }) => {
    e.preventDefault()
    const data = { title: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }


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
              <Form.Field required error={errors.errorPaths.includes('firstName')}>
                <Form.Input
                  fluid
                  label={<h5>First name</h5>}
                  placeholder="First name"
                  name="firstName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('lastName')}>
                <Form.Input
                  fluid
                  label={<h5>Last name</h5>}
                  placeholder="Last name"
                  name="lastName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('otherNames')}>
                <Form.Input
                  fluid
                  label={<h5>Other name</h5>}
                  placeholder="Other name"
                  name="otherNames"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>


            <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('gender')}>

                <Form.Select
                  fluid
                  label={<h5>Gender</h5>}
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

                <Form.Input
                  fluid
                  label={<h5>Email address</h5>}
                  placeholder="Email address"
                  name="email"
                  type="email"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('address')}>

                <Form.Input
                  fluid
                  label={<h5>Address</h5>}
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
            <Form.Field error={errors.errorPaths.includes('title')}>
                <label>Title</label>
                {titles && <TitleDropdown
                  titles={titles}
                  handleOnTitleSearch={handleOnTitleSearch}
                  handleOnTitleChange={handleOnTitleChange}
                />}
              </Form.Field>
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
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Manager</h5>}
                placeholder="Manager"
                name="manager"
                required
              />

              <Form.Field error={errors.errorPaths.includes('department')}>
                <label>Department</label>
                {departments && <DepartmentDropdown
                  departments={departments}
                  handleOnDepartmentSearch={handleOnDepartmentSearch}
                  handleOnDepartmentChange={handleOnDepartmentChange}
                />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('currentSalary')}>

                <Form.Input
                  fluid
                  label={<h5>Current salary</h5>}
                  placeholder="Current salary"
                  name="currentSalary"
                  type="number"
                  step="1"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('startingSalary')}>

                <Form.Input
                  fluid
                  label={<h5>Starting salary</h5>}
                  placeholder="Starting salary"
                  name="startingSalary"
                  type="number"
                  step="1"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('period')}>
                <Form.Input
                  fluid
                  label={<h5>Period</h5>}
                  placeholder="Period"
                  name="period"
                  type="text"
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field error={errors.errorPaths.includes('perPeriod')}>

                <Form.Input
                  fluid
                  label={<h5>Per_period</h5>}
                  placeholder="Per_period"
                  name="per_period"
                  type="number"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('rateHour')}>

                <Form.Input
                  fluid
                  label={<h5>Rate per hour</h5>}
                  placeholder="rate per hour"
                  name="rateperhour"
                  type="number"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('status')}>

                <Form.Select
                  fluid
                  label={<h5>Employee status</h5>}
                  placeholder="Employee status"
                  name="status"
                  selection
                  options={status}
                  onChange={onChange}

                />
              </Form.Field>
              <Form.Field error={errors.errorPaths.includes('qualifications')}>

                <Form.Input
                  fluid
                  label={<h5>Qualifications</h5>}
                  placeholder="Qualifications"
                  name="qualifications"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={<h5>Completed courses</h5>}
                placeholder="Completed courses"
                name="completedcourses"
                required
              />
              <Form.Input
                fluid
                label={<h5>Employee grade</h5>}
                placeholder="Employee grade"
                name="employeegrade"
                required
              />
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
