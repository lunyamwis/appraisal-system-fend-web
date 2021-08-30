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
import { useMutation } from '@apollo/react-hooks';
import "../root.scss";
import { CREATE_TITLE } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { TitleContext } from '../../context/title';


export default function AddNewTitle({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(TitleContext);
  const [successMsg, setSuccessMsg] = useState();
  const [responseErrors, setResponseErrors] = useState([]);
  
  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
  });

  let schema = yup.object().shape({
    titleName: yup.string().required("Please provide the title name"),
  });
  const [addTitle, { loading }] = useCallback(useMutation(CREATE_TITLE, {
    update(_, result) {
      setVisible(false);
      let titleData = result.data.createTitle.title
      context.createTitle(titleData);
      history.push({
        pathname: `/performancemanager/title/${titleData.id}`,
        state: { title: titleData, titleId: titleData.id }
      })

      setSuccessMsg('Successfully Registered A New Title');
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

  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg('');
  }


  const onSubmit = (event) => {
    event.preventDefault();
    setSuccessMsg('');
    validate(values)
    setValues({ ...values, afterSubmit: true })
    if (!errors.errors.length) { addTitle() }
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
                <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/title-records">Titles</a> {'>'} Register New Titles
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new title
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
              <h3>title Information</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('titleName')}>
                <Form.Input
                  fluid
                  label={<h5>Title Name</h5>}
                  placeholder="Title name"
                  name="titleName"
                  onChange={onChange}
                />
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
