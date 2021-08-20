import React, { useReducer, createContext } from 'react';

const initialState = {
    policy: null,
    polices: null,
}


const GradeContext = createContext({
    grade: null,
    grades: null
});


function gradeReducer(state, action) {
    switch (action.type) {
        case 'CREATE_GRADE':
            return {
                ...state,
                grade: action.payload
            }
        case 'UPDATE_GRADE':
            return {
                ...state,
                grade: action.payload
            }
        case 'GET_GRADES':
            return {
                ...state,
                grades: action.payload
            }
        case 'GET_GRADE':
            return {
                ...state,
                grade: action.payload
            }
        case 'DELETE_GRADE':
            return {
                ...state,
                grade: action.payload
            }
        default:
            return state;
    }
}

function GradeProvider(props) {
    const [state, dispatch] = useReducer(gradeReducer, initialState);

    function createGrade(gradeData) {
        dispatch({
            type: 'CREATE_GRADE',
            payload: gradeData,
        })

    }
    function updateGrade(gradeData) {
        dispatch({
            type: 'UPDATE_GRADE',
            payload: gradeData,
        })

    }
    function getGrades(gradeData) {
        dispatch({
            type: 'GET_GRADES',
            payload: gradeData,
        })

    }
    function getGrade(gradeData) {
        dispatch({
            type: 'GET_GRADE',
            payload: gradeData,
        })

    }
    function deleteGrade(gradeData) {
        dispatch({
            type: 'DELETE_GRADE',
            payload: gradeData,
        })

    }

    return (
        <GradeContext.Provider
            value={{ user: state.user, 
                createGrade,updateGrade,
                getGrades,getGrade,deleteGrade, 
                grade: state.grade, grades:state.grades }}
            {...props}
        />
    )
}

export { GradeContext, GradeProvider }