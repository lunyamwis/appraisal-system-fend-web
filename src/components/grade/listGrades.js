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
import { GET_GRADES } from './queries';
import { AuthContext } from '../../context/auth';
import { GradeContext } from '../../context/grade';



export default function Grades() {
  
  const authContext = useContext(AuthContext);
  const [grades, setGrades] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(GradeContext);

  const [fetchGrades, { data: gradeData }] = useLazyQuery(GET_GRADES, {
      variables: pagination
  });

  useEffect(() => {
      if (gradeData) {
          setGrades(gradeData.grades);
          setFetched(true);
      }
  }, [gradeData, grades, context]);

  console.log(grades)
  
  useEffect(() => {
      if (!fetched) {
          fetchGrades()
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

  
  function gradesList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Grade Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Grad Da</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Grade Ta</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Grade Basic</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Grade Bonus</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {grades.items && grades.items.map((grade, index)=>
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={`/performancemanager/grade/${grade.id}`}>
                    {grade.gradeName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{grade.gradeDa}</Table.Cell>
                <Table.Cell>{grade.gradeTa}</Table.Cell>
                <Table.Cell>{grade.gradeBasic}</Table.Cell>
                <Table.Cell>{grade.gradeBonus}</Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add a grade"
            trigger={
              <Button
                href="/performancemanager/add-grade"
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
                grades<Label>{grades && grades.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {gradesList()}
                    <br />
                    {grades.pages ?
                        <Pagination
                            defaultActivePage={grades.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={grades.pages}
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
                            <a href="/performancemanager">Home</a> {'>'}  grades
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of grades below.
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
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchGrades() }}>
                                <Icon name="search" />
                                Find grade
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

