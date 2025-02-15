import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const LOGIN_DEMO_USER = "session/loginDemoUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

const loginDemoUser = (user) => {
  return {
    type: LOGIN_DEMO_USER,
    payload: user,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
  
  


  export const demoLogin = () => async (dispatch) => {
    const demoCredentials = {
      credential: 'Demo', 
      password: 'passwordDemo', 
    };
  
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify(demoCredentials),
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(loginDemoUser(data.user)); 
    } else {
      console.error("Demo login failed");
    }
  };




const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      case LOGIN_DEMO_USER:
        return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };



export default sessionReducer;