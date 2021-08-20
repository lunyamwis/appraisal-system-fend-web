import { gql } from 'graphql-tag';

export const CREATE_EMPLOYER = gql`
mutation createEmployer(
  $businessName:String
  $phoneNumbers:String
  $websiteLink:String
  $address:String
  $contactName:String
  $contactPhoneNumber:String
  $contactRole:String
  $location:String
){
createEmployer(input:{
    
  businessName:$businessName
  phoneNumbers:$phoneNumbers
  websiteLink:$websiteLink
  address:$address
  contactName:$contactName
  contactPhoneNumber:$contactPhoneNumber
  contactRole:$contactRole
  location:$location
})

{
  
    status
    message
    employer{
      id
      deletedAt
      businessName
      phoneNumbers
      websiteLink
      contactName
      contactPhoneNumber
      contactRole
      employerDetails{
        id
        firstName
        lastName
        username
      }
    }
  
}

}

`



export const GET_EMPLOYERS = gql`
query getEmployers ($search:String, $page:Int, $limit:Int){
  employers(
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
      businessName
      phoneNumbers
      websiteLink
      address
      contactName
      contactPhoneNumber
      contactRole
      location
      industry
      size
      employerDetails{
        id
        firstName
        lastName
        username
      }
    }}}
    
`

export const GET_EMPLOYER = gql`
query getEmployer ($id:String){
  employer(id:$id)
  {
     id
      deletedAt
      businessName
      phoneNumbers
      websiteLink
      address
      contactName
      contactPhoneNumber
      contactRole
      location
      industry
      size
      employerDetails{
        id
        firstName
        lastName
        username
      }
  
 }}
`

export const UPDATE_EMPLOYER=gql`
mutation updateEmployer(
  $id:String!
  $businessName:String
  $phoneNumbers:String
  $websiteLink:String
  $address:String
  $contactName:String
  $contactPhoneNumber:String
  $contactRole:String
  $location:String
  $employerDetails:String
) {
  updateEmployer(
    id:$id
    input:{
       businessName:$businessName
      phoneNumbers:$phoneNumbers
      websiteLink:$websiteLink
      address:$address
      contactName:$contactName
      contactPhoneNumber:$contactPhoneNumber
      contactRole:$contactRole
      location:$location
      employerDetails:$employerDetails
  })
  
  {
    
      status
      message
      employer{
        id
        deletedAt
        businessName
        phoneNumbers
        websiteLink
        contactName
        contactPhoneNumber
        contactRole
        employerDetails{
          id
          firstName
          lastName
          username
        }
      }
    
  }

}

`

export const DELETE_EMPLOYER=gql`
mutation deleteEmployer ($id:[String]!){
  deleteEmployer(id:$id){
    status
    message
   }}
`