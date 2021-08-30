<<<<<<< HEAD
import React, {
  useReducer,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useMutation } from "@apollo/react-hooks";
const initialState = {
  user: null,
  systemAlert: null,
  staff: null,
  profile: null,
};

if (localStorage.getItem("loggedInUser")) {
  initialState.user = JSON.parse(localStorage.getItem("loggedInUser"));
}

const DepartmentContext = createContext({
  departmentName: null,
  Pay_grade: null,
});

function departmentReducer(state, action) {
  switch (action.type) {
    case "REGISTER_DEPARTMENT":
      return {
        ...state,
        user: action.payload,
      };

    case "REMO":
      return {
        ...state,
        staff: action.payload,
      };
    case "USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [expiredToken, setExpiredToken] = useState("");

  const [refreshToken, { loading, data: tokenData }] = useMutation(
    REFRESH_TOKEN_MUTATION,
    {
      onError(err) {
        try {
          setUser(null);
          setToken(null);
        } catch (e) {
          setUser(null);
          setToken(null);
        }
      },
      variables: { token: expiredToken },
    }
  );

  let _token = localStorage.getItem("jwtToken") || null;

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return jwt && jwt.exp ? jwt.exp * 1000 : null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const getToken = useCallback(() => {
    if (!_token) {
      return null;
    }
    if (isExpired(getExpirationDate(_token))) {
      setExpiredToken(_token);
      refreshToken();
    }
    return _token;
  }, [_token, refreshToken]);

  const isLoggedIn = () => {
    return !!_token;
  };
  let observers = [];

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setUser = useCallback((user) => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, []);
  const setToken = useCallback((token) => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _token = token;
    notify();
  }, []);
  useEffect(() => {
    if (!loading && tokenData) {
      setToken(tokenData.refreshToken.token);
    }
    if (!getToken() && !window.location.pathname.includes("reset-password")) {
      setToken(null);
    }
  }, [loading, tokenData, refreshToken, setToken, getToken]);

  function login(userData) {
    setToken(userData.tokenAuth.token);
    setUser(userData.tokenAuth.user);

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged) => {
        setIsLogged(newIsLogged);
      };

      subscribe(listener);
      return () => {
        unsubscribe(listener);
      };
    }, []);

    return isLogged;
  };

  function registerAdmin(userData) {
    dispatch({
      type: "REGISTER_ADMIN",
      payload: userData,
    });
  }

  function userProfile(userData) {
    dispatch({
      type: "USER_PROFILE",
      payload: userData,
    });
  }

  function logout() {
    setToken(null);
    setUser(null);
    AuthContext.user = null;

    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profile: state.profile,
        login,
        logout,
        registerAdmin,
        userProfile,
        useAuth,
        getToken,
        setToken,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
=======
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
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
