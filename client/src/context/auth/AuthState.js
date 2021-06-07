import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
// eslint-disable-next-line
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // ==============================
  // Load User --> In this we will check which users is loggedIn and get the user data
  // ==============================
  const loadUserHandeler = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // ==============================
  // Register User --> Sign in the user and get the token back
  // ==============================
  const registerHandeler = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // here res (response) will be token
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUserHandeler();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // ==============================
  // Login User --> Which will log the user and get the token
  // ==============================

  const loginHandeler = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUserHandeler();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // ==============================
  // Logout --> which will destroy the token
  // ==============================
  const logoutHandeler = () => dispatch({ type: LOGOUT });

  // ==============================
  // Clear Errors --> to clear out any errors in the state
  // ==============================
  const clearErrorsHandeler = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register: registerHandeler,
        loadUser: loadUserHandeler,
        login: loginHandeler,
        logout: logoutHandeler,
        clearErrors: clearErrorsHandeler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
