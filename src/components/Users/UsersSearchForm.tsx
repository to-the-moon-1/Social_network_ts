import React from 'react';
import { Field, Form, Formik } from 'formik';

import { searchForm } from '../../constants/Constants';
import { FormProps, FriendFormType } from '../../containers/UsersContainer';

const usersSearchFormValidate = (): Record<string, unknown> => {
  return {};
};

type UsersSearchFormType = {
  submit: (
    values: FormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => void;
  filter: { term: string; friend: FriendFormType };
};

const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo(({ filter, submit }) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: filter.friend }}
      onSubmit={submit}
      validate={usersSearchFormValidate}
    >
      {({ isSubmitting }) => (
        <Form className="form-user">
          <Field className="input-user" name="term" placeholder="Name" type="text" />
          <Field as="select" className="input-user" name="friend">
            {searchForm.map(({ value, option }) => (
              <option key={value} value={value}>
                {option}
              </option>
            ))}
          </Field>
          <button className="main-btn big-btn search-btn" disabled={isSubmitting} type="submit">
            Search
          </button>
        </Form>
      )}
    </Formik>
  </div>
));

export default UsersSearchForm;
