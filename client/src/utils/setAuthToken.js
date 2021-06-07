import axios from 'axios';

const setAuthToken = (token) => {
  // if token is passed in then we will set it to the global headers
  // if noe then we will delete it from the global headers
  if (token) {
    //From the documentation of axios you can see that there is a mechanism available which allows you to set default header which will be sent with every request you make
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
