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
import { GET_TITLE } from "./queries";
import { AuthContext } from "../../context/auth";
import { TitleContext } from "../../context/title";

export default function Title({ props }) {
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState({});
  const context = useContext(TitleContext);
  const titleId = props.computedMatch.params.titleId

  const { loading, data: titleData } = useQuery(GET_TITLE, {
    variables: { id: titleId }
  });

  useEffect(() => {
    if (titleData) {
      setTitle(titleData.title);
    }
  }, [titleData, title, context]);

  return (
    <Container textAlign="center" 
    centered="true" doubling="true" stackable="true">
      <Grid container columns={2}>
      {title.id &&<Grid.Column>
          <div className="content-wrapper">
              <Header as='h4'>
                  <Header.Content>
                      <a href="/performancemanager/title-records">Home</a> {'>'} <a href="/performancemanager/title-records">Titles</a> {'>'} {title.titleName}
                      <Header.Subheader>
                          Hey there {authContext.user.username}, you can review and edit details of {title.titleName} here
                      </Header.Subheader>
                  </Header.Content>
              </Header>
          </div>
      </Grid.Column>}
      </Grid>
      {loading ? <Loader active /> :

        <Segment>
          {title.id &&
          <Header id="form-hd" block>
          <Grid>
            <Grid.Column>
            <h3>Profile</h3>
            </Grid.Column>
            <Grid.Column width={15}>
            <Link to={`/performancemanager/edit-title/${title.id}`}>
              <Button floated="right">
                <Icon name="pencil alternate" />
              </Button>
            </Link>
            </Grid.Column>
          </Grid>
          </Header>}
          {title.id && <Grid>
            <Grid.Column width={6}>
              <Card id="card">
                <Card.Content>
                  <Image
                    fluid
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    circular
                  />
                  <Card.Header id="profile-hd">{title.titleName}</Card.Header>
                  <Card.Description></Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Table striped id="profile-table">
                <Table.Body>

                <Table.Row>
                  <Table.Cell>Title Name</Table.Cell>
                  <Table.Cell>{title.titleName}</Table.Cell>
                </Table.Row>
                
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>}
          <Divider />
        </Segment>}
    </Container>);
}
  