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
import { UPDATE_COURSE, GET_COURSE, DELETE_COURSE } from "./queries";
import { CourseContext } from "../../context/course";



export default function EditCourse({ props }) {


  const options = [
    { key: "DO", text: "PHD", value: "DO" },
  ];

  const courseId = props.computedMatch.params.courseId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [course, setCourse] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(CourseContext);
  const [toDelete, setToDelete] = useState({ employee: [] });
  const [deleteCourseDetails, setDeleteCourseDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    courseName: "",
    courseLevel: "",

  });

  const { data: courseData } = useQuery(GET_COURSE, {
    variables: { id: courseId }
  });

  useEffect(() => {
    if (!values.fetched && courseData) {
      let data = courseData.course
      setValues({ ...values, ...data, update: true, fetched: true, id: courseId });
      setToDelete({ ...toDelete, id: courseId })
      delete data.id

    }
  }, [courseData, context, values, courseId, toDelete]);

  const [deleteACourse, { data: deletedCourse }] = useMutation(DELETE_COURSE, {
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
    variables: { id: deleteCourseDetails.id }
  })

  useEffect(() => {
    if (deletedCourse) {
      console.log(deletedCourse)
    }
  })

  const [updateCourse, { loading }] = useCallback(useMutation(UPDATE_COURSE,
    {
      update(_, result) {
        context.updateCourse(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setCourse(result.data.updateCourse.course)

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


  const removeCourse = () => {
    if (Object.keys(values.id).length) {
      setDeleteCourseDetails({ id: toDelete.id, deleted: false })
    }
  }

  useEffect(() => {
    if (!deleteCourseDetails.deleted && deleteCourseDetails.id.length) {
      deleteACourse()
      setDeleteCourseDetails({ ...deleteCourseDetails, deleted: true, id: [] })
    }

  }, [deleteACourse, deleteCourseDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (Object.keys(values).length > 7 && !errors.errors.length) { updateCourse() }
    removeCourse();
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/course/${course.id}`,
        state: { course }
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
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/course-records">Courses</a> {'>'}  <Link to={`/performancemanager/courser/${courseId}`}> Course </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit an Course Details
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
              <Button id={values.id}  icon floated='right' onClick={removeCourse}>
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
                <Card.Header id="profile-hd">{values.courseName}</Card.Header>
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
                    <Table.Cell>Course Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Course Name'
                          name="courseName" onChange={onChange}
                          value={values.courseName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Course Level</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='courseLevel'
                          name="courseLevel" onChange={onChange}
                          value={values.courseLevel} />
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


