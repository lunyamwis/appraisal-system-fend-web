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
import { GET_EMPLOYERS } from './queries';
import { AuthContext } from '../../context/auth';
import { EmployerContext } from '../../context/employer';


export default function Employers() {
  
  const authContext = useContext(AuthContext);
  const [employers, setEmployers] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(EmployerContext);

  const [fetchEmployers, { data: employerData }] = useLazyQuery(GET_EMPLOYERS, {
      variables: pagination
  });

  useEffect(() => {
      if (employerData) {
          setEmployers(employerData.employers);
          setFetched(true);
      }
  }, [employerData, employers, context]);

  console.log(employers)
  
  useEffect(() => {
      if (!fetched) {
          fetchEmployers()
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

  
  function employersList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Business Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Phone Numbers</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Website Link</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">Contact Name</Table.HeaderCell>
                <Table.HeaderCell id="table-hd">In House Employer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {employers.items && employers.items.map((employer, index)=>
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={`/performancemanager/employer/${employer.id}`}>
                    {employer.businessName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{employer.phoneNumbers}</Table.Cell>
                <Table.Cell>{employer.websiteLink}</Table.Cell>
                <Table.Cell>{employer.contactName}</Table.Cell>
                <Table.Cell>{employer.employerDetails}</Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add a employer"
            trigger={
              <Button
                href="/performancemanager/add-employer"
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
                employers<Label>{employers && employers.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {employersList()}
                    <br />
                    {employers.pages ?
                        <Pagination
                            defaultActivePage={employers.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={employers.pages}
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
                            <a href="/performancemanager">Home</a> {'>'}  employers
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of employers below.
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
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchEmployers() }}>
                                <Icon name="search" />
                                Find Employer
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

