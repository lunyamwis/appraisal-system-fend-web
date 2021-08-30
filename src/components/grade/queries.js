import { gql } from 'graphql-tag';

export const CREATE_GRADE = gql`
mutation createGrade(
    $gradeName:String
    $gradeBasic:String
    $gradeDa:String
    $gradeTa:String
    $gradeBonus:Float
    $gradePf:String
){
  createGrade(input:{
      
    gradeName:$gradeName
    gradeBasic:$gradeBasic
    gradeDa:$gradeDa
    gradeTa:$gradeTa
    gradeBonus:$gradeBonus
    gradePf:$gradePf
    
  })
  
  {
    
      status
      message
      grade{
        id
        deletedAt
        gradeName
        gradeBasic
        gradeDa
        gradeTa
        gradeBonus
      }
    
  }

}

`



export const GET_GRADES = gql`
query getGrades ($search:String, $page:Int, $limit:Int){
    grades(
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
        id
        deletedAt
        gradeName
        gradeDa
        gradeTa
        gradeBasic
        gradeBonus
      }}}
`

export const GET_GRADE = gql`
query getGrade ($id:String){
    grade(id:$id)
    {
       id
       deletedAt
       gradeBasic
       gradeDa
      gradeTa
      gradeBonus
      gradeName
    
   }}`

export const UPDATE_GRADE=gql`
mutation updateGrade (
    $id:String!
    $gradeName:String
    $gradeBasic:String
    $gradeDa:String
    $gradeTa:String
    $gradeBonus:Float
    $gradePf:String
 ){
   updateGrade(
     id:$id
     input:{
       gradeName: $gradeName
       gradeBasic: $gradeBasic
       gradeDa: $gradeDa
       gradeTa: $gradeTa
       gradeBonus: $gradeBonus
       gradePf: $gradePf
   })
   
   {
     
       status
       message
       grade{
         id
         deletedAt
         gradeName
         gradeDa
         gradeTa
         gradeBonus
         gradeBasic
         
       }
     
   }
 
 }
 
`

export const DELETE_GRADE=gql`
mutation deleteGrade ($id:[String]!){
    deleteGrade(id:$id){
      status
      message
     }}
`