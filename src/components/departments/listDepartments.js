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
import { GET_DEPARTMENTS } from './queries';
import { AuthContext } from '../../context/auth';
import { DepartmentContext } from '../../context/department';


export default function Departments() {
  
  const authContext = useContext(AuthContext);
  const [departments, setDepartments] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(DepartmentContext);

  const [fetchDepartments, { data: departmentData }] = useLazyQuery(GET_DEPARTMENTS, {
      variables: pagination
  });

  useEffect(() => {
      if (departmentData) {
          setDepartments(departmentData.departments);
          setFetched(true);
      }
  }, [departmentData, departments, context]);

  console.log(departments)
  
  useEffect(() => {
      if (!fetched) {
          fetchDepartments()
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

  
  function departmentList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Department Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Pay Grade</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {departments.items && departments.items.map((department, index)=>
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={`/performancemanager/department/${department.id}`}>
                    {department.departmentName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{department.payGrade ?  department.payGrade.gradeName:'no department'}</Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add a department"
            trigger={
              <Button
                href="/performancemanager/add-department"
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
                departments<Label>{departments && departments.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {departmentList()}
                    <br />
                    {departments.pages ?
                        <Pagination
                            defaultActivePage={departments.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={departments.pages}
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
                            <a href="/performancemanager">Home</a> {'>'} departments
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of departments below.
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
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchDepartments() }}>
                                <Icon name="search" />
                                Find Department
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

