import { useHistory } from 'react-router-dom';
import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Form,
  Button,
  Grid,
  Icon,
  Divider,
  Input,
  Container,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import "../root.scss";
import { CREATE_DEPARTMENT } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { DepartmentContext } from '../../context/department';
import { GET_GRADES } from '../grade/queries';
import GradeDropdown from '../dropdowns/listGrades';


export default function AddNewDepartment({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(DepartmentContext);
  const [successMsg, setSuccessMsg] = useState();
  const [subDepartments, setSubDepartments] = useState({});
  const [subDepartmentsCount, setSubDepartmentsCount] = useState([0]);
  const [responseErrors, setResponseErrors] = useState([]);
  const [grades, setGrades] = useState();
  const [selectedGrades, setSelectedGrades] = useState({
    search: "", page: 1, limit: 10
  });

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
    subDepartments: []
  });

  let schema = yup.object().shape({
    departmentName: yup.string().required("Please set the department name"),
    payGrade: yup.string(),
  });

  const { data: gradeData } = useQuery(GET_GRADES, {
    variables: selectedGrades
  });
  useEffect(() => {
    if (gradeData) {
      setGrades(gradeData.grades.items);
    }
  }, [gradeData]);


  const [createDepartment, { loading }] = useCallback(useMutation(CREATE_DEPARTMENT, {
    update(_, result) {
      setVisible(false);
      let departmentData = result.data.createDepartment.department
      context.createDepartment(departmentData);
      window.location.reload(true)

      setSuccessMsg('Successfully Registered New Department');
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
      setValues({
        ...values,
        subDepartments: Object.values(subDepartments),
        updated: false
      })
      if (values.afterSubmit) {
        validate(values)
      }
    }
  }, [values, subDepartments, validate])


  const onChange = useCallback((event, { name, value }) => {
    setValues({ ...values, [name]: value, updated: true });
    
  }, [values])

  const handleOnGradeSearch = (e) => {
    setSelectedGrades({ ...selectedGrades, search: e.target.value })
  }
  const handleOnGradeChange = (e, { value }) => {
    e.preventDefault()
    const data = { payGrade: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleAddSubDepartment = useCallback((e) => {
    e.preventDefault();
    if (subDepartmentsCount.length) {
      setSubDepartmentsCount([...subDepartmentsCount, subDepartmentsCount[subDepartmentsCount.length - 1] + 1])
    }
    else { setSubDepartmentsCount([1]) }
  }, [subDepartmentsCount])

  const handleRemoveSubDepartment = useCallback((event) => {
    event.preventDefault();
    const newArr = subDepartmentsCount.filter(e => e !== Number(event.target.id))
    setSubDepartmentsCount(newArr)
    if (Object.keys(subDepartments).length > 0) {
      delete subDepartments[event.target.id]
    }
    setValues({ ...values, updated: true });


  }, [subDepartmentsCount, subDepartments, values])

  const handleOnAddSubDepartmentsChange = (e, { value }) => {
    e.preventDefault()
    let key = e.target.name ? e.target.id : value
    if (!e.target.name) {
      let data = { name: value}
      if (Object.keys(subDepartments).length > 0) {
        setSubDepartments(prevSubDept => ({
          ...prevSubDept,
          [key]: { ...prevSubDept[key], ...data }
        }));
      } else {
        let newSubDepartment = { ...subDepartments, [key]: data }
        setSubDepartments(newSubDepartment);
      }

    }
    else {
      if (Object.keys(subDepartments).length > 0) {
        let data = { [e.target.name]: value }
        setSubDepartments(prevSubDept => ({
          ...prevSubDept,
          [key]: { ...prevSubDept[key], ...data }
        }));
      }
      else {
        let newVal = { ...subDepartments, [key]: { ...subDepartments[key], [e.target.name]: value} }
        setSubDepartments(newVal)
      }
    }
    setValues({ ...values, updated: true });
    
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
    if (!errors.errors.length) { createDepartment() }
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
                  <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/department-records">Departments</a> {'>'} Register New Department
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new department
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
              <h3>Department Info</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('departmentName')}>
                <Form.Input
                  fluid
                  label={<h5>Department</h5>}
                  placeholder="Department "
                  name="departmentName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('payGrade')}>
                <label>Grade</label>
                {grades && <GradeDropdown
                  grades={grades}
                  handleOnGradeSearch={handleOnGradeSearch}
                  handleOnGradeChange={handleOnGradeChange}
                />}
              </Form.Field>
              </Form.Group>
              <Divider horizontal>Add Sub Department</Divider>

              < Form.Group widths='equal'>
                <Form.Field>
                  <Button icon floated='right' onClick={handleAddSubDepartment}>
                    <Icon name='plus square outline' />
                  </Button>
                </Form.Field>
              </Form.Group>
              {subDepartmentsCount.map(key => (
                < Form.Group widths='equal' key={key}>
                  <Form.Field>
                    <label>Name</label>
                    <Input fluid placeholder='Name'
                      id={key}
                      name="name"
                      onChange={handleOnAddSubDepartmentsChange}

                      values={values.minimumPremiumAmount} />
                  </Form.Field>
                  <Form.Field>

                    <Grid>
                      <Grid.Column width={4}>
                        <Button id={key} key={key} icon floated='right' onClick={handleRemoveSubDepartment} size="small" disabled={subDepartmentsCount.length > 1 ? false : true}>
                          <Icon name='trash alternate' id={key} key={key} />
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Form.Field>
                </Form.Group>))}


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
