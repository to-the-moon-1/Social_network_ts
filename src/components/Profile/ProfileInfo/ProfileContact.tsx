import React from 'react';

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contacts: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => (
  <div className="item-field">
    &ndash;&nbsp; {contactTitle}:{' '}
    {contactValue === null || contactValue === '' ? <span>no contact</span> : contactValue}
  </div>
);

export default Contacts;
