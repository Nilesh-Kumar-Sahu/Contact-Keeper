import { SET_ALERT, REMOVE_ALERT } from '../types';

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [
        ...state,
        {
          alert_id: action.payload.alert_id,
          alert_type: action.payload.alert_type,
          alert_msg: action.payload.alert_msg,
        },
      ];
    case REMOVE_ALERT:
      return state.filter(
        (each_alert) => each_alert.alert_id !== action.payload.alert_id
      );
    default:
      return state;
  }
};
