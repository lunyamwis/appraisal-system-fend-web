import { gql } from 'graphql-tag';

export const CREATE_DEPARTMENT = gql`
mutation createDepartment(
  $departmentName:String
  $payGrade:String
  $subDepartments:[SubDepartmentInput]
){
  createDepartment(input:{
      
    departmentName:$departmentName
    payGrade:$payGrade
    subDepartments:$subDepartments
  })
  
  {
    
      status
      message
      department{
        deletedAt
        id
        departmentName
        payGrade{
          id
          gradeName
        }
        subDepartments{
          deletedAt
          id
          name
        }
      }
      
    
  }

}

`



export const GET_DEPARTMENTS = gql`
query getDepartments ($search:String, $page:Int, $limit:Int){
  departments(
    search:$search,
    page:$page,
    limit:$limit)
  {
    count
    pages
    hasNext
    hasPrev
    items
    {
      deletedAt
      id
      departmentName
      payGrade{
        gradeName
      }
      subDepartments{
        deletedAt
        id
        name
      }
  }}}
`

export const GET_DEPARTMENT = gql`
query getDepartment ($id:String){
  department(id:$id)
  {
    deletedAt
    id
    departmentName
    payGrade{
      deletedAt
      id
      gradeName
    }
    subDepartments{
      deletedAt
      id
      name
    }
  
}}
`

export const UPDATE_DEPARTMENT=gql`
mutation updateDepartment (
  $id:String!
  $departmentName:String
  $payGrade:String
  $subDepartments:[SubDepartmentInput]
){
  updateDepartment(
    id:$id
    input:{
      departmentName:$departmentName
      payGrade:$payGrade
      subDepartments:$subDepartments
      
  })
  
  {
    
      status
      message
      department{
        deletedAt
        id
        departmentName
        payGrade{
          deletedAt
          id
          gradeName
        }
        subDepartments{
          deletedAt
          id
          name
        }
      }
    
  }

}

`

export const DELETE_DEPARTMENT=gql`
mutation deleteDepartment($id:[String]!) {
  deleteDepartment(id:$id){
    status
    message
  }}
`

export const UPDATE_SUB_DEPARTMENT=gql`
mutation updateSubDepartment (
  $id:String!
  $name:String
){
updateSubDepartment(
  id:$id
  input:{
      name: $name
    }){
  status
  message
  subDepartments{
      id
      name
    }

  }}
`

export const DELETE_SUB_DEPARTMENT=gql`
mutation deleteSubDepartment($id:[String]!) {
  deleteSubDepartment(id:$id){
    status
    message
  }}
`