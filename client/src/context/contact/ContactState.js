import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ========================
  //Get Contact
  // ========================
  const getContactHandeler = async () => {
    try {
      const res = await axios.get('/api/contact');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data, //this is the actual contacts data that we are fetching
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // ========================
  //Add Contact
  // ========================
  const addContactHandeler = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contact', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data, //this is the actual contacts data that we are sending
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // ========================
  // Update Contact
  // ========================
  const updateContactHandeler = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/contact/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // ========================
  // Delete Contact
  // ========================
  const deleteContactHandeler = async (id) => {
    try {
      // we are just making a request not storing in like a variable res.
      await axios.delete(`/api/contact/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // ========================
  // Clear Contact
  // ========================
  const clearContactHandeler = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };

  // ========================
  // Set Current Contact
  // ========================
  const setCurrentHandeler = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // ========================
  // Clear Current Contact
  // ========================
  const clearCurrentHandeler = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // ========================
  // Filter Contacts
  // ========================
  const filterContactHandeler = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // ========================
  // Clear Filter
  // ========================
  const clearFilterHandeler = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,

        getContacts: getContactHandeler,
        addContact: addContactHandeler,
        deleteContact: deleteContactHandeler,
        clearContacts: clearContactHandeler,
        setCurrent: setCurrentHandeler,
        clearCurrent: clearCurrentHandeler,
        updateContact: updateContactHandeler,
        filterContacts: filterContactHandeler,
        clearFilter: clearFilterHandeler,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
