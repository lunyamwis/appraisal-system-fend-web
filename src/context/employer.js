import React, { useReducer, createContext } from 'react';

const initialState = {
    employer: null,
    employers: null,
}


const EmployerContext = createContext({
    employer: null,
    employers: null
});


function employerReducer(state, action) {
    switch (action.type) {
        case 'CREATE_EMPLOYER':
            return {
                ...state,
                employer: action.payload
            }
        case 'UPDATE_EMPLOYER':
            return {
                ...state,
                employer: action.payload
            }
        case 'GET_EMPLYERS':
            return {
                ...state,
                employers: action.payload
            }
        case 'GET_EMPLOYER':
            return {
                ...state,
                employer: action.payload
            }
        case 'DELETE_EMPLOYER':
            return {
                ...state,
                employer: action.payload
            }
        default:
            return state;
    }
}

function EmployerProvider(props) {
    const [state, dispatch] = useReducer(employerReducer, initialState);

    function createEmployer(employerData) {
        dispatch({
            type: 'CREATE_EMPLOYER',
            payload: employerData,
        })

    }
    function updateEmployer(employerData) {
        dispatch({
            type: 'UPDATE_EMPLOYER',
            payload: employerData,
        })

    }
    function getEmployers(employerData) {
        dispatch({
            type: 'GET_EMPLOYERS',
            payload: employerData,
        })

    }
    function getEmployer(employerData) {
        dispatch({
            type: 'GET_EMPLOYER',
            payload: employerData,
        })

    }
    function deleteEmployer(employerData) {
        dispatch({
            type: 'DELETE_EMPLOYER',
            payload: employerData,
        })

    }

    return (
        <EmployerContext.Provider
            value={{ user: state.user, 
                createEmployer,updateEmployer,
                getEmployers,getEmployer,deleteEmployer, 
                employer: state.employer, employers:state.employers }}
            {...props}
        />
    )
}

export { EmployerContext, EmployerProvider }