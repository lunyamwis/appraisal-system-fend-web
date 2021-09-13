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
import { GET_EMPLOYEES } from './queries';
import { EmployeePolicyContext } from '../../context/employee';
import { AuthContext } from '../../context/auth';



export default function Employees() {
  
  const authContext = useContext(AuthContext);
  const [employees, setEmployees] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(EmployeePolicyContext);

  const [fetchEmployees, { data: employeeData }] = useLazyQuery(GET_EMPLOYEES, {
      variables: pagination
  });

  useEffect(() => {
      if (employeeData) {
          setEmployees(employeeData.employees);
          setFetched(true);
      }
  }, [employeeData, employees, context]);

  console.log(employees)
  
  useEffect(() => {
      if (!fetched) {
          fetchEmployees()
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

  
  function employeeList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Employee Number</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Job Title</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Department</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Email</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Contact</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {employees.items && employees.items.map((employee, index)=>
              <Table.Row key={index}>
                <Table.Cell>{employee.employeeNumber}</Table.Cell>
                <Table.Cell>
                  <Link to={`/performancemanager/employee/${employee.id}`}>
                    {employee.firstName} - {employee.lastName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{employee.jobTitle ? employee.jobTitle.titleName:'no title'}</Table.Cell>
                <Table.Cell>{employee.department ? employee.department.departmentName : 'no de'}</Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>{employee.phoneNumbers}</Table.Cell>
                <Table.Cell>{employee.status}</Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add an employee"
            trigger={
              <Button
                href="/performancemanager/add-employee"
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
                Employees<Label>{employees && employees.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {employeeList()}
                    <br />
                    {employees.pages ?
                        <Pagination
                            defaultActivePage={employees.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={employees.pages}
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
                            <a href="/performancemanager">Home</a> {'>'}  Employees
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of employees below.
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
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchEmployees() }}>
                                <Icon name="search" />
                                Find Employee
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

