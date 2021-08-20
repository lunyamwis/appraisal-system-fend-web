import { gql } from 'graphql-tag';

export const CREATE_COURSE = gql`
mutation createCourse(
    $courseName:String
    $courseLevel:String
){
  createCourse(input:{
      
    courseName:$courseName
    courseLevel:$courseLevel
  })
  
  {
    
      status
      message
      course{
        deletedAt
        id
        courseName
        courseLevel
      }
    
  }

}
`



export const GET_COURSES = gql`
query getCourses ($search:String, $page:Int, $limit:Int){
  courses(
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
      courseName
      courseLevel
  
  }}}`

export const GET_COURSE = gql`
query getCourse ($id:String){
    course(id:$id)
    {
      deletedAt
      id
      courseName
      courseLevel
    
   }}
`

export const UPDATE_COURSE=gql`
mutation updateCourse(
    $id:String!
    $courseName:String
    $courseLevel:String
 ) {
   updateCourse(
     id:$id
     input:{
       courseName:$courseName
       courseLevel:$courseLevel
   })
   
   {
     
       status
       message
       course{
         deletedAt
         id
         courseName
         courseLevel
       }
     
   }
 
 }
 
`

export const DELETE_COURSE=gql`
mutation deleteCourse($id:[String]!) {
    deleteCourse(id:$id){
      status
      message
     }}
`