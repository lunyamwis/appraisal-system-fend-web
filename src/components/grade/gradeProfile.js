import { Link } from "react-router-dom";
import React, { useState,useContext,useEffect } from "react";
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
import { GET_GRADE } from "./queries";
import { AuthContext } from "../../context/auth";
import { GradeContext } from "../../context/grade";


export default function Grade({ props }) {
  const authContext = useContext(AuthContext);
  const [grade, setGrade] = useState({});
  const context = useContext(GradeContext);
  const gradeId = props.computedMatch.params.gradeId

  const { loading, data: gradeData } = useQuery(GET_GRADE, {
    variables: { id: gradeId }
  });

  useEffect(() => {
    if (gradeData) {
      setGrade(gradeData.grade);
    }
  }, [gradeData, grade, context]);

  return (
    <Container textAlign="center" 
    centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
      {grade.id &&<Grid.Column>
          <div className="content-wrapper">
              <Header as='h4'>
                  <Header.Content>
                  <a href="/performancemanager">Home</a> {'>'}  <a href="/performancemanager/grade-records">Grade</a> {'>'} {grade.gradeName}
                      <Header.Subheader>
                          Hey there {authContext.user.username}, you can review and edit details of {grade.gradeName} here
                      </Header.Subheader>
                  </Header.Content>
              </Header>
          </div>
      </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {grade.id &&
          <Header id="form-hd" block>
          <Grid>
            <Grid.Column>
            <h3>Profile</h3>
            </Grid.Column>
            <Grid.Column width={15}>
            <Link to={`/performancemanager/edit-grade/${grade.id}`}>
              <Button floated="right">
                <Icon name="pencil alternate" />
              </Button>
            </Link>
            </Grid.Column>
          </Grid>
          </Header>}
          {grade.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{grade.gradeName}</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                <Table.Row>
                  <Table.Cell>Grade Name</Table.Cell>
                  <Table.Cell>{grade.gradeName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Grade Basic</Table.Cell>
                  <Table.Cell>{grade.gradeBasic}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Grade Ta</Table.Cell>
                  <Table.Cell>{grade.gradeTa}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Grade Da</Table.Cell>
                  <Table.Cell>{grade.gradeDa}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Grade Bonus</Table.Cell>
                  <Table.Cell>{grade.gradeBonus}</Table.Cell>
                </Table.Row>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
  