import { gql } from 'graphql-tag';

export const CREATE_DEPARTMENT = gql`
mutation createDepartment(
  $departmentName:String
  $payGrade:String
  $subDepartment:String
){
  createDepartment(input:{
      
    departmentName:$departmentName
    payGrade:$payGrade
    subDepartment:$subDepartment
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
        subDepartment{
          id
          subDepartnameName
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
      subDepartment{
        id
        subDepartnameName
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
    subDepartment{
      deletedAt
      id
      subDepartnameName
    }
  
}}`

export const UPDATE_DEPARTMENT=gql`
mutation updateDepartment (
  $id:String!
  $departmentName:String
  $payGrade:String
  $subDepartment:String
){
  updateDepartment(
    id:$id
    input:{
      departmentName:$departmentName
      payGrade:$payGrade
      subDepartment:$subDepartment
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
        subDepartment{
          deletedAt
          id
          subDepartmentName
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