import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = []; // array of objects will be stored in state

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // ====================Set Alert====================
  const setAlertHandeler = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {
        alert_id: id,
        alert_msg: msg,
        alert_type: type,
      },
    });

    setTimeout(
      () => dispatch({ type: REMOVE_ALERT, payload: { alert_id: id } }),
      timeout
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert: setAlertHandeler,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
