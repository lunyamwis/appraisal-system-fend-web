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
} from "semantic-ui-react";
import "../root.scss";
import { useQuery } from '@apollo/react-hooks';
import { GET_COURSE } from "./queries";
import { AuthContext } from "../../context/auth";
import { CourseContext } from "../../context/course";


export default function Course({ props }) {
  const authContext = useContext(AuthContext);
  const [course, setCourse] = useState({});
  const context = useContext(CourseContext);
  const courseId = props.computedMatch.params.courseId

  const { loading, data: courseData } = useQuery(GET_COURSE, {
    variables: { id: courseId }
  });

  useEffect(() => {
    if (courseData) {
      setCourse(courseData.course);
    }
  }, [courseData, course, context]);

  return (
    <Container textAlign="center"
      centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
        {course.id && <Grid.Column>
          <div className="content-wrapper">
            <Header as='h4'>
              <Header.Content>
              <a href="/performancemanager">Home</a> {'>'}  <a href="/performancemanager/course-records">Courses</a> {'>'} {course.courseName}
                <Header.Subheader>
                  Hey there {authContext.user.username}, you can review and edit details of {course.courseName} here
                      </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {course.id &&
            <Header id="form-hd" block>
              <Grid>
                <Grid.Column>
                  <h3>Profile</h3>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Link to={`/performancemanager/edit-course/${course.id}`}>
                    <Button floated="right">
                      <Icon name="pencil alternate" />
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid>
            </Header>}
          {course.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{course.courseName}</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>Course Name</Table.Cell>
                    <Table.Cell>{course.courseName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Course Level</Table.Cell>
                    <Table.Cell>{course.courseLevel}</Table.Cell>
                  </Table.Row>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
