import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext_in_Register = useContext(alertContext);
  const authContext_in_Register = useContext(authContext);

  const { setAlert } = alertContext_in_Register;

  const { register, error, clearErrors, isAuthenticated } =
    authContext_in_Register;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChangeHandeler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name_register: name,
        email_register: email,
        password_register: password,
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Accounts <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmitHandeler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChangeHandeler}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChangeHandeler}
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChangeHandeler}
            required
            minLength='6'
            autoComplete='on'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
