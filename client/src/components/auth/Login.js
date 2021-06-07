import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext_in_Login = useContext(alertContext);
  const authContext_in_Login = useContext(authContext);

  const { setAlert } = alertContext_in_Login;

  const { login, error, clearErrors, isAuthenticated } = authContext_in_Login;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChangeHandeler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all the fields', 'danger');
    } else {
      login({
        email_login: email,
        password_login: password,
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmitHandeler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChangeHandeler}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChangeHandeler}
            required
            minLength='6'
            autoComplete='on'
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
