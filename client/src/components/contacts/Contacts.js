import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  const contactContext_in_Contact = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } =
    contactContext_in_Contact;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {/* L-58 */}
          {filtered !== null
            ? filtered.map((each_contact) => (
                <ContactItem key={each_contact._id} contact={each_contact} />
              ))
            : contacts.map((each_contact) => (
                <CSSTransition
                  key={each_contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem key={each_contact._id} contact={each_contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
