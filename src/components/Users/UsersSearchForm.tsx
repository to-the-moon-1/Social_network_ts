import React from 'react';
import { Field, Form, Formik } from 'formik';

import { FilterType } from '../../redux/users-reducer';
import { FormProps, FriendFormType } from './UsersContainer';

const usersSearchFormValidate = (): Record<string, any> => {
  const errors = {};
  return errors;
};

type PropsType = {
  submit: (
    values: FormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => void;
  filter: FilterType;
};

const UsersSearchForm: React.FC<PropsType> = React.memo(({ filter, submit }) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      onSubmit={submit}
      validate={usersSearchFormValidate}
    >
      {({ isSubmitting }) => (
        <Form className="form-user">
          <Field className="input-user" name="term" placeholder="Name" type="text" />
          <Field as="select" className="input-user" name="friend">
            <option value="null">All</option>
            <option value="true">Followed</option>
            <option value="false">Unfollowed</option>
          </Field>
          <button className="main-btn big-btn search-btn" disabled={isSubmitting} type="submit">
            Search
          </button>
        </Form>
      )}
    </Formik>
  </div>
));

UsersSearchForm.displayName = 'UsersSearchForm';

export default UsersSearchForm;
