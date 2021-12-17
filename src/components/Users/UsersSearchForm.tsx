import React from "react";
import {Field, Form, Formik} from "formik";

import {FilterType} from "../../redux/users-reducer";
import {FormProps} from "./UsersContainer";
import {FriendFormType} from "./UsersContainer";

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
}

type PropsType = {
    // onFilterChanged: (filter: FilterType) => void,
    submit: (values: FormProps, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => void,
    filter: FilterType,
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({filter, submit}) => (
    <div>
        <Formik initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
                enableReinitialize={true}
        >
            {({ isSubmitting }) => (
                <Form className="form-user">
                    <Field className="input-user" placeholder="Name" type="text" name="term" />
                    <Field className="input-user" name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button className="main-btn big-btn search-btn" type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
))

export default UsersSearchForm;
