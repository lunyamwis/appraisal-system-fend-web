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
import { UPDATE_DEPARTMENT, GET_DEPARTMENT, DELETE_DEPARTMENT } from "./queries";
import { DepartmentContext } from "../../context/department";


export default function EditDepartment({ props }) {


  const departmentId = props.computedMatch.params.departmentId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [department, setDepartment] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(DepartmentContext);
  const [toDelete, setToDelete] = useState({ employee: [] });
  const [deleteDepartmentDetails, setDeleteDepartmentDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    departmentName: "",
    payGrade: null,

  });

  const { data: departmentData } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId }
  });

  useEffect(() => {
    if (!values.fetched && departmentData) {
      let data = departmentData.department
      setValues({ ...values, ...data, update: true, fetched: true, id: departmentId });
      setToDelete({ ...toDelete, id: departmentId })
      delete data.id

    }
  }, [departmentData, context, values, departmentId, toDelete]);

  const [deleteADepartment, { data: deletedDepartment }] = useMutation(DELETE_DEPARTMENT, {
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
    variables: { id: deleteDepartmentDetails.id }
  })

  useEffect(() => {
    if (deletedDepartment) {
      console.log(deletedDepartment)
    }
  })

  const [updateDepartment, { loading }] = useCallback(useMutation(UPDATE_DEPARTMENT,
    {
      update(_, result) {
        context.updateDepartment(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setDepartment(result.data.updateDepartment.department)

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


  const removeDepartment = () => {
    if (Object.keys(values.id).length) {
      setDeleteDepartmentDetails({ id: toDelete.id, deleted: false })
    }
  }

  useEffect(() => {
    if (!deleteDepartmentDetails.deleted && deleteDepartmentDetails.id.length) {
      deleteADepartment()
      setDeleteDepartmentDetails({ ...deleteDepartmentDetails, deleted: true, id: [] })
    }

  }, [deleteADepartment, deleteDepartmentDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (Object.keys(values).length > 7 && !errors.errors.length) { updateDepartment() }
    removeDepartment();
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/department/${department.id}`,
        state: { department }
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
              <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/department-records">departments</a> {'>'}  <Link to={`/performancemanager/department/${departmentId}`}> department </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit an department Details
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
              <Button id={values.id}  icon floated='right' onClick={removeDepartment}>
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
                <Card.Header id="profile-hd">{values.departmentName}</Card.Header>
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
                    <Table.Cell>Department Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Department Name'
                          name="departmentName" onChange={onChange}
                          value={values.departmentName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Pay Grade</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='payGrade'
                          name="payGrade" onChange={onChange}
                          value={values.payGrade} />
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


