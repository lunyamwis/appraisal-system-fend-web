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
import { UPDATE_GRADE, GET_GRADE, DELETE_GRADE } from "./queries";
import { GradeContext } from "../../context/grade";



export default function EditGrade({ props }) {

  
  const gradeId = props.computedMatch.params.gradeId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [grade, setGrade] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(GradeContext);
  const [toDelete, setToDelete] = useState({ grade: [] });
  const [deleteGradeDetails, setDeleteGradeDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    gradeName: "",
    gradeBasic: "",
    gradeDa: "",
    gradeTa: "",
    gradeBonus: 5441,
    gradePf:""

  });

  const { data: gradeData } = useQuery(GET_GRADE, {
    variables: { id: gradeId }
  });

  useEffect(() => {
    if (!values.fetched && gradeData) {
      let data = gradeData.grade
      setValues({ ...values, ...data, update: true, fetched: true, id: gradeId });
      setToDelete({ ...toDelete, id: gradeId })
      delete data.id

    }
  }, [gradeData, context, values, gradeId, toDelete]);

  const [deleteAGrade, { data: deletedGrade }] = useMutation(DELETE_GRADE, {
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
    variables: { id: deleteGradeDetails.id }
  })

  useEffect(() => {
    if (deletedGrade) {
      console.log(deletedGrade)
    }
  })

  const [updateGrade, { loading }] = useCallback(useMutation(UPDATE_GRADE,
    {
      update(_, result) {
        context.updateGrade(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setGrade(result.data.updateGrade.grade)

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


  const removeGrade = () => {
    if (Object.keys(values.id).length) {
      setDeleteGradeDetails({ id: toDelete.id, deleted: false })
    }
  }

  useEffect(() => {
    if (!deleteGradeDetails.deleted && deleteGradeDetails.id.length) {
      deleteAGrade()
      setDeleteGradeDetails({ ...deleteGradeDetails, deleted: true, id: [] })
    }

  }, [deleteAGrade, deleteGradeDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (!errors.errors.length) { updateGrade() }
    removeGrade();
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/grade/${grade.id}`,
        state: { grade }
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
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/grade-records">Grades</a> {'>'}  <Link to={`/performancemanager/grade/${gradeId}`}> Grade </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit a Grade Details
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
              <Button id={values.id}  icon floated='right' onClick={removeGrade}>
                <Icon name='trash alternate' id={values.id}/>
              </Button>
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
                <Card.Header id="profile-hd">{values.gradeName}</Card.Header>
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
                    <Table.Cell>Grade Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Name'
                          name="gradeName" onChange={onChange}
                          value={values.gradeName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade Basic</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Basic'
                          name="gradeBasic" onChange={onChange}
                          value={values.gradeBasic} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade Da</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Da'
                          name="gradeDa" onChange={onChange}
                          value={values.gradeDa} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade Ta</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Ta'
                          name="gradeTa" onChange={onChange}
                          value={values.gradeTa} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade Pf</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Pf'
                          name="gradePf" onChange={onChange}
                          value={values.gradePf} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Grade Bonus</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Grade Bonus'
                          name="gradeBonus" type="number" onChange={onChange}
                          value={values.gradeBonus} />
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


