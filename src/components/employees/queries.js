import { gql } from 'graphql-tag';

export const CREATE_EMPLOYEE = gql`
mutation createEmployee(
    $status:String
    $gender:String
    $employeeNumber:String
    $firstName:String
    $lastName:String
    $otherNames:String
    $email:String
    $address:String
    $phoneNumbers:String
    $emergencyNumbers:String
    $dateOfBirth:Date
    $jobTitle:String
    $employerName:String
    $department:[String]
    $completedCourses:String
    $grade:String
    $hiringDate:Date
    $currentSalary:Float
    $startingSalary:Float
    $qualifications:String
    $rateHour:Float
    $period:String
    $perPeriod:Float
){
createEmployee(input:{
    status:$status
    gender:$gender
    employeeNumber:$employeeNumber
    firstName:$firstName
    lastName:$lastName
    otherNames:$otherNames
    email:$email
    address:$address
    phoneNumbers:$phoneNumbers
    emergencyNumbers:$emergencyNumbers
    dateOfBirth:$dateOfBirth
    jobTitle:$jobTitle
    employerName:$employerName
    department:$department
    hiringDate:$hiringDate
    currentSalary:$currentSalary
    startingSalary:$startingSalary
    qualifications:$qualifications
    completedCourses:$completedCourses
    rateHour:$rateHour
    period:$period
    perPeriod:$perPeriod
    grade:$grade
    
})

{
    status
    message
    employee{
        deletedAt
        id
        status
        gender
        firstName
        lastName
        otherNames
        email
    }
}

}

`



export const GET_EMPLOYEES = gql`
query getEmployees ($search:String, $page:Int, $limit:Int){
    employees(
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
        status
        gender
        employeeNumber
        firstName
        lastName
        otherNames
        email
        phoneNumbers
        emergencyNumbers
        dateOfBirth
        jobTitle{
            titleName
        }
        employerName{
            businessName
            employerDetails{
                firstName
                lastName
                username
            }
        }
        department{
            departmentName
        }
        hiringDate
        grade{
            gradeName
            gradeBasic
        }

}}}
`

export const GET_EMPLOYEE = gql`
query getEmployee ($id:String){
    employee(id:$id)
    {
        id
        deletedAt
        status
        gender
        employeeNumber
        period
        perPeriod
        firstName
        lastName
        otherNames
        rateHour
        email
        phoneNumbers
        emergencyNumbers
        currentSalary
        startingSalary
        qualifications
        dateOfBirth
        jobTitle{
            titleName
        }
        employerName{
            businessName
            employerDetails{
                firstName
                lastName
                username
            }
        }
        department{
            departmentName
        }
        completedCourses{
            deletedAt
            id
            courseName
            courseLevel
        }
        hiringDate
        grade{
            gradeName
            gradeBasic
        }
    
}}
`

export const UPDATE_EMPLOYEE=gql`
mutation updateEmployee(
    $id:String!
    $status:String
    $gender:String
    $firstName:String
    $lastName:String
    $employeeNumber:String
    $otherNames:String
    $email:String
    $address:String
    $phoneNumbers:String
    $emergencyNumbers:String
    $dateOfBirth:Date
    $jobTitle:String
    $employerName:String
    $department:[String]
    $hiringDate:Date
    $currentSalary:Float
    $startingSalary:Float
    $qualifications:String
    $completedCourses:String
    $rateHour:Float
    $period:String
    $perPeriod:Float
    $grade:String
) {
updateEmployee(
    id:$id
    input:{
        status:$status
        gender:$gender
        employeeNumber:$employeeNumber
        firstName:$firstName
        lastName:$lastName
        otherNames:$otherNames
        email:$email
        address:$address
        phoneNumbers:$phoneNumbers
        emergencyNumbers:$emergencyNumbers
        dateOfBirth:$dateOfBirth
        jobTitle:$jobTitle
        employerName:$employerName
        department:$department
        hiringDate:$hiringDate
        currentSalary:$currentSalary
        startingSalary:$startingSalary
        qualifications:$qualifications
        completedCourses:$completedCourses
        rateHour:$rateHour
        period:$period
        perPeriod:$perPeriod
        grade:$grade
        
    }
)  
{
    
        status
        message
        employee{
            deletedAt
            id
            status
            gender
            firstName
            lastName
            otherNames
            email
        }
    
}

}

`

export const DELETE_EMPLOYEE=gql`
mutation deleteEmployee ($id:[String]!){
    deleteEmployee(id:$id){
        status
        message
    }}
`