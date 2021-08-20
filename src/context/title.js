import React, { useReducer, createContext } from 'react';

const initialState = {
    policy: null,
    polices: null,
}


const TitleContext = createContext({
    title: null,
    titles: null
});


function titleReducer(state, action) {
    switch (action.type) {
        case 'CREATE_TITLE':
            return {
                ...state,
                title: action.payload
            }
        case 'UPDATE_TITLE':
            return {
                ...state,
                title: action.payload
            }
        case 'GET_TITLES':
            return {
                ...state,
                titles: action.payload
            }
        case 'GET_TITLE':
            return {
                ...state,
                title: action.payload
            }
        case 'DELETE_TITLE':
            return {
                ...state,
                title: action.payload
            }
        default:
            return state;
    }
}

function TitleProvider(props) {
    const [state, dispatch] = useReducer(titleReducer, initialState);

    function createTitle(titleData) {
        dispatch({
            type: 'CREATE_TITLE',
            payload: titleData,
        })

    }
    function updateTitle(titleData) {
        dispatch({
            type: 'UPDATE_TITLE',
            payload: titleData,
        })

    }
    function getTitles(titleData) {
        dispatch({
            type: 'GET_TITLES',
            payload: titleData,
        })

    }
    function getTitle(titleData) {
        dispatch({
            type: 'GET_TITLE',
            payload: titleData,
        })

    }
    function deleteTitle(titleData) {
        dispatch({
            type: 'DELETE_TITLE',
            payload: titleData,
        })

    }

    return (
        <TitleContext.Provider
            value={{ user: state.user, 
                createTitle,updateTitle,
                getTitles,getTitle,deleteTitle, 
                title: state.title, titles:state.titles }}
            {...props}
        />
    )
}

export { TitleContext, TitleProvider }