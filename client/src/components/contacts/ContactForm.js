import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext_in_contactForm = useContext(ContactContext);

  const { addContact, clearCurrent, updateContact, current } =
    contactContext_in_contactForm;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext_in_contactForm, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChangeHandeler = (e) =>
    setContact({
      ...contact,

      [e.target.name]: e.target.value,
    });

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    if (current === null) {
      // addContact is in defined is ContactState
      addContact(contact);
    } else {
      // updateContact is in defined is ContactState
      updateContact(contact);
    }
    clearAll();
  };

  //Clear the contacts form
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmitHandeler}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChangeHandeler}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChangeHandeler}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChangeHandeler}
      />
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChangeHandeler}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChangeHandeler}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
