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
import { UPDATE_EMPLOYER, GET_EMPLOYER, DELETE_EMPLOYER, FETCH_USERS_QUERY } from "./queries";
import { EmployerContext } from "../../context/employer";
import UsersDropdown from "../dropdowns/listUsers";
import DeleteModal from "../modals/toDelete";


export default function EditEmployer({ props }) {


  const employerId = props.computedMatch.params.employerId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [employer, setEmployer] = useState({});
  let history = useHistory();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(EmployerContext);
  const [toDelete, setToDelete] = useState({ grade: [] });
  const [deleteEmployerDetails, setDeleteEmployerDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState({
    search: "", page: 1, limit: 10
  });
  const [search, setSearch] = useState({ search: "" });

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    businessName: "",
    phoneNumbers: "",
    websiteLink: "",
    contactName: "",
    contactPhoneNumber: "",
    contactRole: "",
    location: "",
    employerDetails: ""

  });



  const { data: employerData } = useQuery(GET_EMPLOYER, {
    variables: { id: employerId }
  });

  useEffect(() => {
    if (!values.fetched && employerData) {
      let data = employerData.employer
      setValues({ ...values, ...data, update: true, fetched: true, id: employerId });
      setToDelete({ ...toDelete, id: employerId })
      delete data.id

    }
  }, [employerData, context, values, employerId, toDelete]);

  const [deleteAnEmployer, { data: deletedEmployer }] = useMutation(DELETE_EMPLOYER, {
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
    variables: { id: deleteEmployerDetails.id }
  })

  useEffect(() => {
    if (deletedEmployer) {
      console.log(deletedEmployer)
    }
  })

  const [updateEmployer, { loading }] = useCallback(useMutation(UPDATE_EMPLOYER,
    {
      update(_, result) {
        context.updateEmployer(result.data);
        setVisible(false);

        console.log("response", result.data);
        console.log("saved data", result.data);
        setEmployer(result.data.updateEmployer.employer)

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

  const { data: userData } = useQuery(FETCH_USERS_QUERY, {
    variables: selectedUsers
  });
  useEffect(() => {
    if (userData) {
      setUsers(userData.users.items);
    }
  }, [userData]);

  const [open, setOpen] = useState(false);
  const removeEmployer = (e) => {
    e.preventDefault()
    if (deleteEmployerDetails.id) {
      setOpen(false)
      setDeleteEmployerDetails({ id: employerId, deleted: false })
      window.location.reload(true)
    }
  }


  useEffect(() => {
    if (!deleteEmployerDetails.deleted && deleteEmployerDetails.id) {
      deleteAnEmployer()
      setDeleteEmployerDetails({ ...deleteEmployerDetails, deleted: true, id: [] })
    }

  }, [deleteAnEmployer, deleteEmployerDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  const handleOnUserSearch = (e) => {
    setSelectedUsers({ ...selectedUsers, search: e.target.value })
  }
  const handleOnUserChange = (e, { value }) => {
    e.preventDefault()
    const data = { employerDetails: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (!errors.errors.length) { updateEmployer() }
    setVisible(false);
  }
  useEffect(() => {
    if (values.done) {
      history.push({
        pathname: `/performancemanager/employer/${employer.id}`,
        state: { employer }
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
                <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/employer-records">Employers</a> {'>'}  <Link to={`/performancemanager/employer/${employerId}`}> Employer </Link> {'>'} Edit Details
                        <Header.Subheader>
                  Fill in this form to edit an Employer Details
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
              {/* <Button id={values.id} icon floated='right' onClick={removeEmployer}>
                <Icon name='trash alternate' id={values.id} />
              </Button> */}
              <DeleteModal handleRemovalItem={removeEmployer}/>
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
                <Card.Header id="profile-hd">{values.businessName}</Card.Header>
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
                    <Table.Cell>Business Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Business Name'
                          name="businessName" onChange={onChange}
                          value={values.businessName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Phone Numbers</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Phone Numbers'
                          name="phoneNumbers" onChange={onChange}
                          value={values.phoneNumbers} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Website Link</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Website Link'
                          name="websiteLink" onChange={onChange}
                          value={values.websiteLink} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Contact Name</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Contact Name'
                          name="contactName" onChange={onChange}
                          value={values.contactName} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Contact Phone Number</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Contact Phone Number'
                          name="contactPhoneNumber" onChange={onChange}
                          value={values.contactPhoneNumber} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Contact Role</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Contact Role'
                          name="contactRole" onChange={onChange}
                          value={values.contactRole} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Location</Table.Cell>
                    <Table.Cell>
                      <Form.Field>
                        <Input fluid placeholder='Location'
                          name="location" onChange={onChange}
                          value={values.location} />
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>In House Employer Details</Table.Cell>
                    <Table.Cell>
                      <Form.Field error={errors.errorPaths.includes('employerDetails')}>
                        {users && <UsersDropdown
                          users={users}
                          handleOnUserSearch={handleOnUserSearch}
                          handleOnUserChange={handleOnUserChange}
                        />}
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


