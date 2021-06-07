import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
const ContactFilter = () => {
  const contactContext_in_contactFilter = useContext(ContactContext);

  const textRef = useRef('');

  const { filterContacts, clearFilter, filtered } =
    contactContext_in_contactFilter;

  useEffect(() => {
    if (filtered === null) {
      textRef.current.value = '';
    }
  });
  const onChangeHandeler = (e) => {
    if (textRef.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={textRef}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChangeHandeler}
      />
    </form>
  );
};

export default ContactFilter;
