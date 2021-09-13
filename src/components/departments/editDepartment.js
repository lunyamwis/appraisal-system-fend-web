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
import { UPDATE_DEPARTMENT, GET_DEPARTMENT, DELETE_DEPARTMENT, DELETE_SUB_DEPARTMENT } from "./queries";
import { DepartmentContext } from "../../context/department";
import { GET_GRADES } from "../grade/queries";
import GradeDropdown from "../dropdowns/listGrades";
import DeleteModal from "../modals/toDelete";


export default function EditDepartment({ props }) {


  const departmentId = props.computedMatch.params.departmentId
  const [errors, setErrors] = useState({
    errorPaths: [],
    errors: []
  });

  const [department, setDepartment] = useState({});
  let history = useHistory();
  const [successMsg, setSuccessMsg] = useState();
  const [responseErrors, setResponseErrors] = useState([]);
  const context = useContext(DepartmentContext);
  const [toDelete, setToDelete] = useState({ employee: [], subDepartments: [] });
  const [deleteDepartmentDetails, setDeleteDepartmentDetails] = useState({ id: [], deleted: false });
  const [visible, setVisible] = useState(false);
  const [grades, setGrades] = useState();
  const [additionalFetched, setAdditionalFetched] = useState(false);
  const [deleteSubDepartment, setDeleteSubDepartment] = useState({ id: [], deleted: false });
  const [subDepartments, setSubDepartments] = useState({});
  const [subDepartmentsCount, setSubDepartmentsCount] = useState([1]);
  const [selectedGrades, setSelectedGrades] = useState({
    search: "", page: 1, limit: 10
  });

  const [values, setValues] = useState({
    afterSubmit: false,
    done: false,
    fetched: false,
    id: "",
    departmentName: "",
    payGrade: null,
    subDepartments: {}
  });

  const { data: departmentData } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId }
  });

  useEffect(() => {
    if (!values.fetched && departmentData) {
      let data = departmentData.department
      let currentSubDepts = {}
      let subDeptIds = []
      data.subDepartments.forEach((subDept, key) => {
        currentSubDepts[key + 1] = {
          name: subDept.name
        }
        subDeptIds.push(subDept.id)
      });
      setSubDepartments(currentSubDepts)

      setToDelete({ ...toDelete, subDepartments: subDeptIds })
      if (!additionalFetched) {
        let addSubDepts = data.subDepartments.length;
        let newSubDepts = []
        for (let i = 1; i <= addSubDepts; i++) {
          newSubDepts.push(i)
        }
        setSubDepartmentsCount(newSubDepts)
        setAdditionalFetched(true)
      }
      delete data.subDepartments
      setValues({ ...values, ...data, update: true, fetched: true, id: departmentId });

    }
  }, [departmentData, context, additionalFetched, subDepartmentsCount, values, departmentId, toDelete]);


  const { data: gradeData } = useQuery(GET_GRADES, {
    variables: selectedGrades
  });
  useEffect(() => {
    if (gradeData) {
      setGrades(gradeData.grades.items);
    }
  }, [gradeData]);


  const [deleteADepartment, { data: deletedDepartment }] = useMutation(DELETE_DEPARTMENT, {
    // update(_, result) {
    //   setVisible(false)
    //   context.deleteDepartment(result.data.deleteDepartment.department);
    //   // window.location.reload(true)

    //   setSuccessMsg('Successfully Removed the Department');
    // },
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

  const [deleteSubDept, { data: deletedSubDept }] = useMutation(DELETE_SUB_DEPARTMENT, {
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
    variables: { id: deleteSubDepartment.id }
  })
  useEffect(() => {
    if (deletedSubDept) {
      console.log(deletedSubDept)
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
  
  const [open, setOpen] = useState(false);
  const removeDepartment = (e) => {
    e.preventDefault()
    if (deleteDepartmentDetails.id) {
      setOpen(false)
      setDeleteDepartmentDetails({ id: departmentId, deleted: false })
      window.location.reload(true)
    }
  }

  useEffect(() => {
    if (!deleteDepartmentDetails.deleted && deleteDepartmentDetails.id) {
      deleteADepartment()
      setDeleteDepartmentDetails({ ...deleteDepartmentDetails, deleted: true, id: [] })
    }

  }, [deleteADepartment, deleteDepartmentDetails])


  const onChange = useCallback((event) => {
    setValues({ ...values, [event.target.name]: event.target.value, updated: true });
  }, [values])

  const handleOnGradeSearch = (e) => {
    setSelectedGrades({ ...selectedGrades, search: e.target.value })
  }
  const handleOnGradeChange = (e, { value }) => {
    e.preventDefault()
    const data = { payGrade: value }
    setValues({ ...values, ...data, updated: true });
    // validate()
  }

  const handleOnAddSubDeptChange = (e, { value }) => {
    e.preventDefault()
    let key = e.target.name ? e.target.id : value
    if (!e.target.name) {
      let data = { name: value}
      if (Object.keys(subDepartments).length > 0) {
        setSubDepartments(prevSubDept => ({
          ...prevSubDept,
          [key]: { ...prevSubDept[key], ...data }
        }));
      } else {
        let newSubDept = { ...subDepartments, [key]: data }
        setSubDepartments(newSubDept);
      }
    }
    else {
      if (Object.keys(subDepartments).length > 0) {
        let data = { [e.target.name]: value }
        setSubDepartments(prevSubDept => ({
          ...prevSubDept,
          [key]: { ...prevSubDept[key], ...data }
        }));
      }
      else {

        let newVal = { ...subDepartments, [key]: { ...subDepartments[key], [e.target.name]: value } }
        setSubDepartments(newVal)
      }
    }
    setValues({ ...values, updated: true });

  }

  const handleAddSubDept = useCallback((e) => {
    e.preventDefault();
    if (subDepartmentsCount.length) {
      setSubDepartmentsCount([...subDepartmentsCount, subDepartmentsCount[subDepartmentsCount.length - 1] + 1])
    }
    else { setSubDepartmentsCount([1]) }
  }, [subDepartmentsCount])

  const handleRemoveSubDept = useCallback((event) => {
    event.preventDefault();
    const newArr = subDepartmentsCount.filter(e => e !== Number(event.target.id))
    setSubDepartmentsCount(newArr)
    if (Object.keys(subDepartments).length > 0) {
      delete subDepartments[event.target.id]
    }

  }, [subDepartments, subDepartmentsCount])

  useEffect(() => {
    if (values.updated) {
      setValues({ ...values, subDepartments: Object.values(subDepartments), updated: false })
    }
  }, [values, subDepartments])

  const handleDismiss = () => {
    setVisible(false);
    setSuccessMsg('');
  }


  const deleteAdditional = () => {
    if (Object.keys(values.subDepartments).length) {
      setDeleteSubDepartment({ id: toDelete.subDepartments, deleted: false })
    }
  }
  useEffect(() => {
    if (!deleteSubDepartment.deleted && deleteSubDepartment.id.length) {
      deleteSubDept()
      setDeleteSubDepartment({ ...deleteSubDepartment, deleted: true, id: [] })
    }

  }, [deleteSubDept, deleteSubDepartment])

  function onSubmit(event) {
    event.preventDefault();
    // validate(values);
    setValues({ ...values, afterSubmit: true });
    if (Object.keys(values).length > 7 && !errors.errors.length) { updateDepartment() }
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
              {/* <Button id={values.id} icon floated='right' onClick={removeDepartment}>
                <Icon name='trash alternate' id={values.id} />
              </Button> */}
              <DeleteModal handleRemovalItem={removeDepartment} />
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
              {successMsg ?
              <Message
                positive
                onDismiss={handleDismiss}
                header='status'
                content={successMsg} /> :
              ''}

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
                      <Form.Field error={errors.errorPaths.includes('payGrade')}>
                        {grades && <GradeDropdown
                          grades={grades}
                          handleOnGradeSearch={handleOnGradeSearch}
                          handleOnGradeChange={handleOnGradeChange}
                          selected={values.payGrade}
                        />}
                      </Form.Field>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      < Form.Group widths='equal'>
                        <Form.Field>
                          <Button icon floated='right' onClick={handleAddSubDept}>
                            <Icon name='plus square outline' />
                          </Button>
                        </Form.Field>
                      </Form.Group>
                      {subDepartmentsCount.map(key => (
                        < Form.Group widths='equal' key={key}>

                          <Form.Field>

                            <Grid>
                              <label><b>Name</b></label>
                              <Grid.Column width={12}>
                                <Input fluid placeholder='Name'
                                  name="name"
                                  id={key}
                                  onChange={handleOnAddSubDeptChange}
                                  value={subDepartments[key] && subDepartments[key].name ? subDepartments[key].name : ""} />
                              </Grid.Column>
                              <Grid.Column width={4}>
                                <Button id={key} key={key} icon floated='right' onClick={handleRemoveSubDept} size="small">
                                  <Icon name='trash alternate' id={key} key={key} />
                                </Button>
                              </Grid.Column>
                            </Grid>
                          </Form.Field>
                        </Form.Group>))}
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


