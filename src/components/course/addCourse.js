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
import { useMutation } from '@apollo/react-hooks';
import "../root.scss";
import { CREATE_COURSE } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { CourseContext } from '../../context/course';



export default function AddNewCourse({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(CourseContext);
  const [successMsg, setSuccessMsg] = useState();
  const [responseErrors, setResponseErrors] = useState([]);
  
  const options = [
    {
      key: 'DO',
      text: 'PHD',
      value: 'DO',
    },
    
  ]

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
    
  });

  let schema = yup.object().shape({
    courseName: yup.string().required("Please set the course name"),
    courseLevel: yup.string().required("Please set the course level"),
  });
  const [addCourse, { loading }] = useCallback(useMutation(CREATE_COURSE, {
    update(_, result) {
      setVisible(false);
      let courseData = result.data.createCourse.course
      context.createCourse(courseData);
      history.push({
        pathname: `/performancemanager/course/${courseData.id}`,
        state: { course: courseData, courseId: courseData.id }
      })

      setSuccessMsg('Successfully Registered New Course');
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


  const onChange = useCallback((event, { name, value }) => {
    setValues({ ...values, [name]: value, updated: true });
  }, [values])

  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setSuccessMsg('');
    validate(values)
    setValues({ ...values, afterSubmit: true })
    if (!errors.errors.length) { addCourse() }
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
                  <a href="/performancemanager">Home</a> {'>'}  <a href="/performancemanager/course-records">Courses</a> {'>'} Register New Course
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new course
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
              <h3>Course Info</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('courseName')}>
                <Form.Input
                  fluid
                  label={<h5>Course Title</h5>}
                  placeholder="Course Title"
                  name="courseName"
                  onChange={onChange}
                />
              </Form.Field>
      
              <Form.Field error={errors.errorPaths.includes('courseLevel')}>

              <Form.Select
                fluid
                label={<h5>Level</h5>}
                options={options}
                name="courseLevel"
                placeholder="Course Level"
                onChange={onChange}
                required
              />
              </Form.Field>

        
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
