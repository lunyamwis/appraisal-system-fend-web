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
import { CREATE_GRADE } from "./queries";
import * as yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { GradeContext } from '../../context/grade';



export default function AddNewGrade({ props }) {

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(GradeContext);
  const [successMsg, setSuccessMsg] = useState();
  const [responseErrors, setResponseErrors] = useState([]);
  
  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
  });

  let schema = yup.object().shape({
    gradeName: yup.string().required("Please provide the grade name"),
    gradeBasic: yup.string().required("Please provide the grade basic"),
    gradeDa: yup.string().required("Please provide grade da"),
    gradeTa: yup.string().required("Please provide grade ta"),
    gradePf: yup.string().required("Please provide grade pf"),
    gradeBonus: yup.number().required("Please indicate the grade bonus"),
  });
  const [addGrade, { loading }] = useCallback(useMutation(CREATE_GRADE, {
    update(_, result) {
      setVisible(false);
      let gradeData = result.data.createGrade.grade
      context.createGrade(gradeData);
      history.push({
        pathname: `/performancemanager/grade/${gradeData.id}`,
        state: { grade: gradeData, gradeId: gradeData.id }
      })

      setSuccessMsg('Successfully Registered A New Grade');
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
    if (!errors.errors.length) { addGrade() }
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
                <a href="/performancemanager">Home</a> {'>'} <a href="/performancemanager/grade-records">Grades</a> {'>'} Register New Grade
          <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form to add a new grade
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
              <h3>Grade Information</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field required error={errors.errorPaths.includes('gradeName')}>
                <Form.Input
                  fluid
                  label={<h5>Grade Name</h5>}
                  placeholder="Grade name"
                  name="gradeName"
                  onChange={onChange}
                />
              </Form.Field>

              
            </Form.Group>
            <Form.Group widths={5}>
            <Form.Field required error={errors.errorPaths.includes('gradeDa')}>
                <Form.Input
                  fluid
                  label={<h5>Grade Da</h5>}
                  placeholder="Grade Da"
                  name="gradeDa"
                  onChange={onChange}
                  />
              </Form.Field>
              <Form.Field required error={errors.errorPaths.includes('gradePf')}>
                <Form.Input
                  fluid
                  label={<h5>Grade Pf</h5>}
                  placeholder="Grade Pf"
                  name="gradePf"
                  onChange={onChange}
                  />
              </Form.Field>
              <Form.Field required error={errors.errorPaths.includes('gradeTa')}>
                <Form.Input
                  fluid
                  label={<h5>Grade Ta</h5>}
                  placeholder="Grade Ta"
                  name="gradeTa"
                  onChange={onChange}
                />
              </Form.Field>


            
              <Form.Field error={errors.errorPaths.includes('gradeBasic')}>

                <Form.Input
                  fluid
                  label={<h5>Grade Basic</h5>}
                  placeholder="Grade Basic"
                  name="gradeBasic"
                  onChange={onChange}
                  required
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes('gradeBonus')}>

                <Form.Input
                  fluid
                  label={<h5>Grade Bonus</h5>}
                  placeholder="Grade Bonus"
                  name="gradeBonus"
                  type="number"
                  step="1"
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
