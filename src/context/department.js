import React, { useReducer, createContext } from 'react';

const initialState = {
    policy: null,
    polices: null,
}


const DepartmentContext = createContext({
    department: null,
    departments: null
});


function departmentReducer(state, action) {
    switch (action.type) {
        case 'CREATE_DEPARTMENT':
            return {
                ...state,
                department: action.payload
            }
        case 'UPDATE_DEPARTMENT':
            return {
                ...state,
                department: action.payload
            }
        case 'GET_DEPARTMENTS':
            return {
                ...state,
                departments: action.payload
            }
        case 'GET_DEPARTMENT':
            return {
                ...state,
                department: action.payload
            }
        case 'DELETE_DEPARTMENT':
            return {
                ...state,
                department: action.payload
            }
        default:
            return state;
    }
}

function DepartmentProvider(props) {
    const [state, dispatch] = useReducer(departmentReducer, initialState);

    function createDepartment(departmentData) {
        dispatch({
            type: 'CREATE_DEPARTMENT',
            payload: departmentData,
        })

    }
    function updateDepartment(departmentData) {
        dispatch({
            type: 'UPDATE_DEPARTMENT',
            payload: departmentData,
        })

    }
    function getDepartments(departmentData) {
        dispatch({
            type: 'GET_DEPARTMENTS',
            payload: departmentData,
        })

    }
    function getDepartment(departmentData) {
        dispatch({
            type: 'GET_DEPARTMENT',
            payload: departmentData,
        })

    }
    function deleteDepartment(departmentData) {
        dispatch({
            type: 'DELETE_DEPARTMENT',
            payload: departmentData,
        })

    }

    return (
        <DepartmentContext.Provider
            value={{ user: state.user, 
                createDepartment,updateDepartment,
                getDepartments,getDepartment,deleteDepartment, 
                department: state.department, departments:state.departments }}
            {...props}
        />
    )
}

export { DepartmentContext, DepartmentProvider }
