import { gql } from 'graphql-tag';

export const CREATE_TITLE = gql`
mutation createTitle(
  $titleName:String
){
createTitle(input:{
    titleName:$titleName
})

{
  
    status
    message
    title{
      deletedAt
      id
      titleName
    }
  
}

}

`



export const GET_TITLES = gql`
query getTitles ($search:String, $page:Int, $limit:Int){
  titles(
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
      titleName
  
  }}}`

export const GET_TITLE = gql`
query getTitle ($id:String){
  title(id:$id)
  {
    deletedAt
    id
    titleName
  
 }}
`

export const UPDATE_TITLE=gql`
mutation updateTitle(
  $id:String!
  $titleName:String
) {
 updateTitle(
   id:$id
   input:{
     titleName:$titleName
 })
 
 {
   
     status
     message
     title{
       deletedAt
       id
       titleName
     }
   
 }

} 
`

export const DELETE_TITLE=gql`
mutation deleteTitle($id:[String]!) {
  deleteTitle(id:$id){
    status
    message
   }}
`