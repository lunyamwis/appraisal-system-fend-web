import { useHistory } from 'react-router-dom';
import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Form,
  Button,
  Grid,
  Icon,
  Divider,
  Container,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import "../root.scss";
import { CREATE_EMPLOYER, FETCH_USERS_QUERY } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { EmployerContext } from '../../context/employer';
import UsersDropdown from '../dropdowns/listUsers';


export default function AddNewEmployer({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(EmployerContext);
  const [successMsg, setSuccessMsg] = useState();
  const [responseErrors, setResponseErrors] = useState([]);
  const [users, setUsers] = useState();
  const [selectedUsers,setSelectedUsers] = useState({
    search: "", page: 1, limit: 10
  });

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
  });

  let schema = yup.object().shape({
    businessName: yup.string().required("Please provide the employer business name"),
    phoneNumbers: yup.string().required("Please provide the employer phone numbers"),
    websiteLink: yup.string().required("Please provide employer website link"),
    address: yup.string().required("Please provide employer address"),
    contactName: yup.string().required("Please provide employer contact person"),
    contactPhoneNumber: yup.string().required("Please provide employer contact phone number"),
    contactRole: yup.string().required("Please provide employer contact role"),
    location: yup.string().required("Please provide employer location"),
    employerDetails: yup.string()
  });
  
  const { data: userData } = useQuery(FETCH_USERS_QUERY, {
    variables: selectedUsers
  });
  useEffect(() => {
    if (userData) {
      setUsers(userData.users.items);
    }
  }, [userData]);
  
  const [createEmployer, { loading }] = useCallback(useMutation(CREATE_EMPLOYER, {
    update(_, result) {
      setVisible(false);
      let employerData = result.data.createEmployer.employer
      context.createEmployer(employerData);
      window.location.reload(true)

      setSuccessMsg('Successfully Registered A New Employer');
    },
    onError(err) {
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
    variables: values
  }));

  const validate = useCallback((values) => {
    schema.validate(values, { abortEarly: false })
      .then(valid => setErrors({ errorPaths: [], errors: [] })) //called if the entire form is valid
      .catch(err => {
        setErrors({ errors: err.errors, errorPaths: err.inner.map(i => i.path) })
      })
  }, [schema])

  useEffect(() => {
    if (values.updated) {
      setValues({ ...values, updated: false })
      if (values.afterSubmit) {
        validate(values)
      }
    }
  }, [values, validate])


  const onChange = useCallback((event, { name, value }) => {
    setValues({ ...values, [name]: value, updated: true });
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

  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg('');
  }


  const onSubmit = (event) => {
    event.preventDefault();
    setSuccessMsg('');
    validate(values)
    setValues({ ...values, afterSubmit: true })
    if (!errors.errors.length) { createEmployer() }
    setVisible(false);
  }


  return (
    <div className=".app-container">
      <Container
        textAlign="center"
        id="form-cont"
      >
        <Grid container padded>
          <Grid.Column>
            <div className="content-wrapper">
              <Header as='h4'>
                <Icon name='settings' />
                <Header.Content>
                <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/employer-records">Employers</a> {'>'} Register New Employer
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new employer
          </Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          </Grid.Column>
        </Grid>
        {successMsg ?
          <Message
            positive
            onDismiss={handleDismiss}
            header='status'
            content={successMsg} /> :
          ''}
        <Segment id="form-seg">
          <Form id="form" onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
            <Form.Group>
              <Message visible={!!errors.errors.length || visible} warning>
                <Message.Header>Please correct the following issues:</Message.Header>
                {!!responseErrors.length && <Message>{responseErrors}</Message>}
                {<Message.List items={errors.errors} />}
              </Message>
            </Form.Group>
            <Header id="form-hd" block>
              <h3>employer Information</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('businessName')}>
                <Form.Input
                  fluid
                  label={<h5>Business Name</h5>}
                  placeholder="Business Name"
                  name="businessName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required error={errors.errorPaths.includes('phoneNumbers')}>
                <Form.Input
                  fluid
                  label={<h5>Phone Numbers</h5>}
                  placeholder="Phone Numbers"
                  name="phoneNumbers"
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field required error={errors.errorPaths.includes('websiteLink')}>
                <Form.Input
                  fluid
                  label={<h5>Website Link</h5>}
                  placeholder="Website Link"
                  name="websiteLink"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">

              <Form.Field required error={errors.errorPaths.includes('address')}>
                <Form.Input
                  fluid
                  label={<h5>Address</h5>}
                  placeholder="address"
                  name="address"
                  onChange={onChange}
                />
              </Form.Field>



              <Form.Field error={errors.errorPaths.includes('contactName')}>

                <Form.Input
                  fluid
                  label={<h5>Contact Name</h5>}
                  placeholder="Contact Name"
                  name="contactName"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('contactPhoneNumber')}>

                <Form.Input
                  fluid
                  label={<h5>Contact Phone Number</h5>}
                  placeholder="Contact Phone Number"
                  name="contactPhoneNumber"
                  onChange={onChange}
                />
              </Form.Field>

              </Form.Group>
              <Form.Group widths="equal">
              <Form.Field error={errors.errorPaths.includes('contactRole')}>

                <Form.Input
                  fluid
                  label={<h5>Contact Role</h5>}
                  placeholder="Contact Role"
                  name="contactRole"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('location')}>

                <Form.Input
                  fluid
                  label={<h5>Location</h5>}
                  placeholder="Location"
                  name="location"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('employerDetails')}>
                <label>In House Employer</label>
                {users && <UsersDropdown
                  users={users}
                  handleOnUserSearch={handleOnUserSearch}
                  handleOnUserChange={handleOnUserChange}
                />}
              </Form.Field>


            </Form.Group>

            <Button
              type="submit"
              color="teal"
            >
              Submit
              </Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}
