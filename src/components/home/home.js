import React from 'react';
import {
  Grid,
  Card,
  Container,
  Header,
  Icon
} from 'semantic-ui-react';

import '../root.scss';

export default function HomeOverview() {
  return (
    <div className='app-container'>
      <Container>

        <Header as='h4'>
          <Header.Content>
            <a href="/performancemanager">Overview</a> {'>'} Appraisal System
            <Header.Subheader>Please select an option below to proceed</Header.Subheader>
          </Header.Content>
        </Header>

        <Grid columns={3}>

          <Grid.Row>
            <Grid.Column>
              <Card color="black" href='/performancemanager/employee-records'>
                <Card.Content>
                  <Card.Header>Employee Module {'>'}</Card.Header>
                  <Card.Meta></Card.Meta>
                  <Card.Description>
                    Employee module helps in managing employee data
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card color="teal" href='/performancemanager/department-records'>
                <Card.Content>
                  <Card.Header>Departments / Teams Module {'>'} </Card.Header>
                  <Card.Meta></Card.Meta>
                  <Card.Description>
                    Allows addition of new teams and departments

                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card color="teal" href='/performancemanager/employer-records'>
                <Card.Content>
                  <Card.Header>Employers / Managers Module {'>'} </Card.Header>
                  <Card.Meta></Card.Meta>
                  <Card.Description>
                    Allows updating of management structure
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

        </Grid>

        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
                <Card color="teal" href='/performancemanager/grade-records'>
                  <Card.Content>
                    <Card.Header>Pay Grades {'>'} </Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                      Development of payment structures
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            <Grid.Column>
                <Card color="teal" href='/performancemanager/title-records'>
                  <Card.Content>
                    <Card.Header>Job Title {'>'} </Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                      Update the titles and badges for the employees
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            <Grid.Column>
                <Card color="teal" href='/performancemanager/course-records'>
                  <Card.Content>
                    <Card.Header>Training {'>'} </Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                      Manage your employers and employees trainings
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
          </Grid.Row>  
        </Grid>
      </Container>
    </div>
  )
}
