import { useHistory } from "react-router-dom";
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
  Message,
} from "semantic-ui-react";
import moment from "moment";
import { DateInput } from "semantic-ui-calendar-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import "../root.scss";
import { CREATE_DEPARTMENT, GET_DEPARTMENTS } from "./queries";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import { AuthContext } from "../../context/auth";
import { DepartmentContext } from "../../context/department";
import SubDepartmentDropDown from "../dropdowns/listSubDepartment";

export default function AddNewDepartment({ props }) {
  const authContext = useContext(AuthContext);
  let history = useHistory();

  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: [],
  });
  const [visible, setVisible] = useState(false);

  const context = useContext(DepartmentContext);
  const [successMsg, setSuccessMsg] = useState();
  const [subDepartments, setSubDepartments] = useState();
  const [selectedSubDepartment, setSelectedSubDepartment] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  const [responseErrors, setResponseErrors] = useState([]);

  const [values, setValues] = useState({
    updated: true,
    afterSubmit: false,
  });

  let schema = yup.object().shape({
    departmentName: yup.string().required("Please set the department name"),
    payGrade: yup.string(),
    subDepartment: yup.string(),
  });
  const { data: subDepartmentData } = useQuery(GET_DEPARTMENTS, {
    variables: selectedSubDepartment,
  });
  useEffect(() => {
    if (subDepartmentData) {
      setSubDepartments(subDepartmentData.departments.items.subDepartment);
    }
  }, [subDepartmentData]);
  const [createDepartment, { loading }] = useCallback(
    useMutation(CREATE_DEPARTMENT, {
      update(_, result) {
        setVisible(false);
        let departmentData = result.data.createDepartment.department;
        context.createDepartment(departmentData);
        history.push({
          pathname: `/performancemanager/department/${departmentData.id}`,
          state: {
            department: departmentData,
            departmentId: departmentData.id,
          },
        });

        setSuccessMsg("Successfully Registered New Department");
      },
      onError(err) {
        try {
          if (err.graphQLErrors) {
            setResponseErrors(err.graphQLErrors[0].message);
          }

          if (err.networkError !== null && err.networkError !== "undefined") {
            setResponseErrors(err.networkError.result.errors[0]);
          } else if (
            err.graphQLErrors !== null &&
            err.networkError !== "undefined"
          ) {
            setResponseErrors(err.graphQLErrors.result.errors[0]);
          }
        } catch (e) {
          setVisible(true);
        }
      },
      variables: values,
    })
  );

  const validate = useCallback(
    (values) => {
      schema
        .validate(values, { abortEarly: false })
        .then((valid) => setErrors({ errorPaths: [], errors: [] })) //called if the entire form is valid
        .catch((err) => {
          setErrors({
            errors: err.errors,
            errorPaths: err.inner.map((i) => i.path),
          });
        });
    },
    [schema]
  );

  useEffect(() => {
    if (values.updated) {
      setValues({ ...values, updated: false });
      if (values.afterSubmit) {
        validate(values);
      }
    }
  }, [values, validate]);

  const onChange = useCallback(
    (event, { name, value }) => {
      setValues({ ...values, [name]: value, updated: true });
    },
    [values]
  );

  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSuccessMsg("");
    validate(values);
    setValues({ ...values, afterSubmit: true });
    if (!errors.errors.length) {
      createDepartment();
    }
    setVisible(false);
  };
  const handleOnSubDepartmentSearch = (e) => {
    setSelectedSubDepartment({
      ...selectedSubDepartment,
      search: e.target.value,
    });
  };
  const handleOnSubDepartmentChange = (e, { value }) => {
    e.preventDefault();
    const data = { subDepartment: value };
    setValues({ ...values, ...data, updated: true });
    // validate()
  };

  return (
    <div className=".app-container">
      <Container textAlign="center" id="form-cont">
        <Grid container padded>
          <Grid.Column>
            <div className="content-wrapper">
              <Header as="h4">
                <Icon name="settings" />
                <Header.Content>
                  <a href="/performancemanager">Home</a> {">"}{" "}
                  <a href="/performancemanager/department-records">
                    Departments
                  </a>{" "}
                  {">"} Register New Department
                  <Header.Subheader>
                    Hello there {authContext.user.username}, Fill in this form
                    to add a new department
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          </Grid.Column>
        </Grid>
        {successMsg ? (
          <Message
            positive
            onDismiss={handleDismiss}
            header="status"
            content={successMsg}
          />
        ) : (
          ""
        )}
        <Segment id="form-seg">
          <Form
            id="form"
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Form.Group>
              <Message visible={!!errors.errors.length || visible} warning>
                <Message.Header>
                  Please correct the following issues:
                </Message.Header>
                {!!responseErrors.length && <Message>{responseErrors}</Message>}
                {<Message.List items={errors.errors} />}
              </Message>
            </Form.Group>
            <Header id="form-hd" block>
              <h3>Department Info</h3>
            </Header>
            <Form.Group widths="equal">
              <Form.Field
                required
                error={errors.errorPaths.includes("departmentName")}
              >
                <Form.Input
                  fluid
                  label={<h5>Department</h5>}
                  placeholder="Department "
                  name="departmentName"
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field error={errors.errorPaths.includes("payGrade")}>
                <Form.Input
                  fluid
                  label={<h5>Department</h5>}
                  name="payGrade"
                  placeholder="Pay Grade"
                  onChange={onChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field error={errors.errorPaths.includes("subdepartment")}>
              <label>Sub-Department</label>
              {subDepartments && (
                <SubDepartmentDropDown
                  departments={subDepartments}
                  handleOnDepartmentSearch={handleOnSubDepartmentSearch}
                  handleOnDepartmentChange={handleOnSubDepartmentChange}
                />
              )}
            </Form.Field>
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}
