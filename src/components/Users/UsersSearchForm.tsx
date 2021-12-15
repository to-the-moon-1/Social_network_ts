import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import classes from "./Users.module.css"
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FriendFormType = 'true' | 'false' | 'null';

type FormProps = {
    term: string,
    friend: FriendFormType,
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter);

    const submit = (values: FormProps, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div>
        <Formik initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
                enableReinitialize={true}
        >
            {({ isSubmitting }) => (
                <Form className={classes.form}>
                    <Field className={classes.input} placeholder="Name" type="text" name="term" />
                    <Field className={classes.input} name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button className={[classes.setBtn, classes.mainBtn].join(' ')} type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm;