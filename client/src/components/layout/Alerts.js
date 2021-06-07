import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';
const Alerts = () => {
  const alertContext_in_Alerts = useContext(alertContext);
  return (
    alertContext_in_Alerts.alerts.length > 0 &&
    alertContext_in_Alerts.alerts.map((each_alert) => (
      <div
        key={each_alert.alert_id}
        className={`alert alert-${each_alert.alert_type}`}
      >
        <i className='fas fa-info-circle' /> {each_alert.alert_msg}
      </div>
    ))
  );
};

export default Alerts;
