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
import { GET_TITLES } from './queries';
import { AuthContext } from '../../context/auth';
import { TitleContext } from '../../context/title';


export default function Titles() {
  
  const authContext = useContext(AuthContext);
  const [titles, setTitles] = useState({});
  const [fetched, setFetched] = useState(false);
  const [pagination, setPagination] = useState({
      limit: 10,
      page: 1,
      search: ""
  });

  const context = useContext(Titles);

  const [fetchTitles, { data: titleData }] = useLazyQuery(GET_TITLES, {
      variables: pagination
  });

  useEffect(() => {
      if (titleData) {
          setTitles(titleData.titles);
          setFetched(true);
      }
  }, [titleData, titles, context]);

  console.log(titles)
  
  useEffect(() => {
      if (!fetched) {
          fetchTitles()
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

  
  function titlesList(){

  
  return (
      <div>
        <Container className="employee-container">
          <Table striped id="table-emp">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell id="table-hd">Title Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {titles.items && titles.items.map((title, index)=>
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={`/performancemanager/title/${title.id}`}>
                    {title.titleName}
                  </Link>
                </Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>

          <Popup
            content="add a grade"
            trigger={
              <Button
                href="/performancemanager/add-title"
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
                titles<Label>{titles && titles.count}</Label>
            </Menu.Item>
        ),
        render: () => {
            return (
                <Tab.Pane>
                    {titlesList()}
                    <br />
                    {titles.pages ?
                        <Pagination
                            defaultActivePage={titles.page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            onPageChange={handleOnPageChange}
                            totalPages={titles.pages}
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
                            <a href="/performancemanager">Home</a> {'>'}  titles
                                <Header.Subheader>
                                    Hey there {authContext.user.username}, find a list of titles below.
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
                            <Form.Button icon size={'medium'} onClick={(e) => { e.preventDefault(); fetchTitles() }}>
                                <Icon name="search" />
                                Find Title
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

