import React, { useState, useContext, useEffect } from 'react';

import {
  Container,
  Header,
  Label,
  Popup,
  Table,
  Grid,
  Icon,
  Button,
  Menu,
  Tab,
  Form,
  Pagination
} from "semantic-ui-react";
import "../root.scss";
import { useLazyQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { GET_COURSES } from './queries';
import { CourseContext } from '../../context/course';
import { AuthContext } from '../../context/auth';



export default function Courses() {
  
  const authContext = useContext(AuthContext);
  const [courses, setCourses] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(CourseContext);

  const [fetchCourses, { data: courseData }] = useLazyQuery(GET_COURSES, {
      variables: pagination
  });

  useEffect(() => {
      if (courseData) {
          setCourses(courseData.courses);
          setFetched(true);
      }
  }, [courseData, courses, context]);

  console.log(courses)
  
  useEffect(() => {
      if (!fetched) {
          fetchCourses()
      }
  })
  const handleOnPageChange = (e, data) => {
      e.preventDefault()
      setPagination({ ...pagination, page: data.activePage })
  }
  const handleOnSearch = (e) => {
      e.preventDefault()
      setPagination({ ...pagination, search: e.target.value })

  }

  
  function courseList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Course Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Course Level</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {courses.items && courses.items.map((course, index)=>
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={`/performancemanager/course/${course.id}`}>
                    {course.courseName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{course.courseLevel}</Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add a course"
            trigger={
              <Button
                href="/performancemanager/add-course"
                className="ui primary"
                id="float"
                centered="true"
              >
                <Icon className="ui large" name="add user" />
              </Button>
            }
          />
        </Container>
      </div>
    );
  }
  const panes = [
    {
        menuItem: (
            <Menu.Item key='motor' disabled={true}>
                courses<Label>{courses && courses.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {courseList()}
                    <br />
                    {courses.pages ?
                        <Pagination
                            defaultActivePage={courses.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={courses.pages}
                        /> : ""}
                </Tab.Pane>
            )
        },
    }
  ]
  return(
    <Container>
            <Grid container columns={2} padded>
                <Grid.Column>
                    <div className="content-wrapper">
                        <Header as='h4'>
                            <Header.Content>
                                <a href="/performancemanager">Home</a> {'>'} courses
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of courses below.
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </div>
                </Grid.Column>

            </Grid>

            <Grid container columns={1} padded>
                <Grid.Column>
                    <Form>
                        <Form.Group>
                            <Form.Input
                                placeholder='Name, Policy number...'
                                name='name'
                                onChange={handleOnSearch}
                            />
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchCourses() }}>
                                <Icon name="search" />
                                Find Course
                            </Form.Button>
                        </Form.Group>
                    </Form>
                </Grid.Column>
            </Grid>

            <Grid container padded>
                <Grid.Column>
                    <Tab panes={panes} />
                </Grid.Column>
            </Grid>

        </Container>
  )
}

