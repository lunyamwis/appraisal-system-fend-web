import React, { useState, useContext, useEffect, useCallback } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Grid,
  Container,
  Segment,
  Table,
  Input,
  Message,
  Header,
  Icon,
  Card,
  Image
} from "semantic-ui-react";
import "../root.scss";
import { UPDATE_TITLE, GET_TITLE, DELETE_TITLE } from "./queries";
import { TitleContext } from "../../context/title";
import DeleteModal from "../modals/toDelete";


export default function EditTitle({ props }) {

  
  const titleId = props.computedMatch.params.titleId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [title, setTitle] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(TitleContext);
  const [toDelete, setToDelete] = useState({ title: [] });
  const [deleteTitleDetails, setDeleteTitleDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    titleName: "",

  });

  const { data: titleData } = useQuery(GET_TITLE, {
    variables: { id: titleId }
  });

  useEffect(() => {
    if (!values.fetched && titleData) {
      let data = titleData.title
      setValues({ ...values, ...data, update: true, fetched: true, id: titleId });
      setToDelete({ ...toDelete, id: titleId })
      delete data.id

    }
  }, [titleData, context, values, titleId, toDelete]);

  const [deleteATitle, { data: deletedTitle }] = useMutation(DELETE_TITLE, {
    onError(err) {

      // { err.networkError ? console.log(err.networkError.result) : console.log(err.graphQLErrors) }


      try {
        if (err.graphQLErrors) {

          setResponseErrors(err.graphQLErrors[0].message);

        }

        if (err.networkError !== null && err.networkError !== 'undefined') {

          setResponseErrors(err.networkError.result.errors[0]);

        } else if (err.graphQLErrors !== null && err.networkError !== 'undefined') {

          setResponseErrors(err.graphQLErrors.result.errors[0]);

        }
      } catch (e) {
        setVisible(true);
      }
    },
    variables: { id: deleteTitleDetails.id }
  })

  useEffect(() => {
    if (deletedTitle) {
      console.log(deletedTitle)
    }
  })

  const [updateTitle, { loading }] = useCallback(useMutation(UPDATE_TITLE,
    {
      update(_, result) {
        context.updateTitle(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setTitle(result.data.updateTitle.title)

        setValues({ ...values, done: true });
      },
      onError(err) {

        // { err.networkError ? console.log(err.networkError.result) : console.log(err.graphQLErrors) }


        try {
          if (err.graphQLErrors) {
            setResponseErrors(err.graphQLErrors[0].message);
          }

          if (err.networkError !== null && err.networkError !== 'undefined') {

            setResponseErrors(err.networkError.result.errors[0]);

          } else if (err.graphQLErrors !== null && err.networkError !== 'undefined') {

            setResponseErrors(err.graphQLErrors.result.errors[0]);

          }
        } catch (e) {
          setVisible(true);
        }
      },
      variables: values,
    }));

    const [open, setOpen] = useState(false);
    const removeTitle = (e) => {
      e.preventDefault()
      if (deleteTitleDetails.id) {
        setOpen(false)
        setDeleteTitleDetails({ id: titleId, deleted: false })
        window.location.reload(true)
      }
    }
  
  

  useEffect(() => {
    if (!deleteTitleDetails.deleted && deleteTitleDetails.id) {
      deleteATitle()
      setDeleteTitleDetails({ ...deleteTitleDetails, deleted: true, id: [] })
    }

  }, [deleteATitle, deleteTitleDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (!errors.errors.length) { updateTitle() }
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/title/${title.id}`,
        state: { title }
      })
    }
  })

  return (
    <Container textAlign="center"
      centered="true" doubling="true" stackable="true">
      <Grid container>
        <Grid.Column>
          <div className="content-wrapper">
            <Header as='h4'>
              <Header.Content>
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/title-records">Titles</a> {'>'}  <Link to={`/performancemanager/title/${titleId}`}> Title </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit a Title Details
                        </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Grid.Column>
      </Grid>
      {values.id && <Segment id="form-seg">
        <Header id="form-hd" block>
          <Grid>
            <Grid.Column>
              <h3>Edit</h3>
            </Grid.Column>
            <Grid.Column width={15}>
              {/* <Button id={values.id}  icon floated='right' onClick={removeTitle}>
                <Icon name='trash alternate' id={values.id}/>
              </Button> */}
              <DeleteModal handleRemovalItem={removeTitle} />
            </Grid.Column>
          </Grid>
        </Header>
        <Grid>
          <Grid.Column width={6}>
            <Card id="card">
              <Card.Content>
                <Image
                  fluid
                  src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                  circular
                />
                <Card.Header id="profile-hd">{values.titleName}</Card.Header>
                <Card.Description></Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <Form id="form" onSubmit={onSubmit} noValidate>
              <Form.Group>

                <Message visible={!!errors.errors.length || visible} warning>
                  <Message.Header>Please correct the following issues:</Message.Header>
                  {!!responseErrors.length && <Message>{responseErrors}</Message>}
                  {<Message.List items={errors.errors} />}
                </Message>
              </Form.Group>
              <Table striped id="profile-table">
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>Title Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Title Name'
                          name="titleName" onChange={onChange}
                          value={values.titleName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  
                </Table.Body>

              </Table>

              <Button
                type="submit"
                color="teal"
              >
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>}
    </Container>
  );

}


