import React, { useReducer, createContext } from 'react';

const initialState = {
    policy: null,
    polices: null,
}


const CourseContext = createContext({
    course: null,
    courses: null
});


function courseReducer(state, action) {
    switch (action.type) {
        case 'CREATE_COURSE':
            return {
                ...state,
                course: action.payload
            }
        case 'UPDATE_COURSE':
            return {
                ...state,
                course: action.payload
            }
        case 'GET_COURSES':
            return {
                ...state,
                courses: action.payload
            }
        case 'GET_COURSE':
            return {
                ...state,
                course: action.payload
            }
        case 'DELETE_COURSE':
            return {
                ...state,
                course: action.payload
            }
        default:
            return state;
    }
}

function CourseProvider(props) {
    const [state, dispatch] = useReducer(courseReducer, initialState);

    function createCourse(courseData) {
        dispatch({
            type: 'CREATE_COURSE',
            payload: courseData,
        })

    }
    function updateCourse(courseData) {
        dispatch({
            type: 'UPDATE_COURSE',
            payload: courseData,
        })

    }
    function getCourses(courseData) {
        dispatch({
            type: 'GET_COURSES',
            payload: courseData,
        })

    }
    function getCourse(courseData) {
        dispatch({
            type: 'GET_COURSE',
            payload: courseData,
        })

    }
    function deleteCourse(courseData) {
        dispatch({
            type: 'DELETE_COURSE',
            payload: courseData,
        })

    }

    return (
        <CourseContext.Provider
            value={{ user: state.user, 
                createCourse,updateCourse,
                getCourses,getCourse,deleteCourse, 
                course: state.course, courses:state.courses }}
            {...props}
        />
    )
}

export { CourseContext, CourseProvider }