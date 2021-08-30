import React, { useReducer, createContext } from 'react';

const initialState = {
    policy: null,
    polices: null,
}


const EmployeePolicyContext = createContext({
    employee: null,
    employees: null
});


function employeePolicyReducer(state, action) {
    switch (action.type) {
        case 'CREATE_EMPLOYEE':
            return {
                ...state,
                employee: action.payload
            }
        case 'UPDATE_EMPLOYEE':
            return {
                ...state,
                employee: action.payload
            }
        case 'GET_EMPLOYEES':
            return {
                ...state,
                employees: action.payload
            }
        case 'GET_EMPLOYEE':
            return {
                ...state,
                employee: action.payload
            }
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employee: action.payload
            }
        default:
            return state;
    }
}

function EmployeePolicyProvider(props) {
    const [state, dispatch] = useReducer(employeePolicyReducer, initialState);

    function createEmployee(employeeData) {
        dispatch({
            type: 'CREATE_EMPLOYEE',
            payload: employeeData,
        })

    }
    function updateEmployee(employeeData) {
        dispatch({
            type: 'UPDATE_EMPLOYEE',
            payload: employeeData,
        })

    }
    function getEmployees(employeeData) {
        dispatch({
            type: 'GET_EMPLOYEES',
            payload: employeeData,
        })

    }
    function getEmployee(employeeData) {
        dispatch({
            type: 'GET_EMPLOYEE',
            payload: employeeData,
        })

    }
    function deleteEmployee(employeeData) {
        dispatch({
            type: 'DELETE_EMPLOYEE',
            payload: employeeData,
        })

    }

    return (
        <EmployeePolicyContext.Provider
            value={{ user: state.user, 
                createEmployee,updateEmployee,
                getEmployees,getEmployee,deleteEmployee, 
                employee: state.employee, employees:state.employees }}
            {...props}
        />
    )
}

export { EmployeePolicyContext, EmployeePolicyProvider }