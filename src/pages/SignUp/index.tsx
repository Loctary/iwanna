import React, { useState } from 'react';
import qs from 'qs';
import { withFirebase } from 'components/Firebase';
import { WithFirebase } from 'components/Firebase/FirebaseHOC';
import 'styles/form.css';
import { Field, reduxForm, InjectedFormProps, Form, FormSubmitHandler } from 'redux-form';
import Input from 'components/Form/Input/Input';
import { required, minLength6, validEmail } from 'lib/validation';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from 'store/domain';

export const Submit = styled.button`
  margin-top: 50px;
  outline: none;
  background-color: transparent;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 40px;
  font-size: 20px;
  font-family: 'Poppins';
  font-weight: 500;
  transition: box-shadow 0.15s ease-in;
  &:hover,
  &:focus {
    box-shadow: 0px 1px 5px 1px gray;
  }
`;

interface SubmitValues {
  email: string;
  password: string;
}

interface OwnProps extends InjectedFormProps<SubmitValues>, WithFirebase {}

const mapStateToProps = (state: RootState) => ({});

const SignUp: React.FC<OwnProps> = (props) => {
  const { firebase, handleSubmit } = props;
  const location = useLocation();
  const history = useHistory();

  const onSubmit: FormSubmitHandler<SubmitValues> = async (values, _, props) => {
    // @ts-ignore
    // values.preventDefault();
    // console.log(values, props);
    // e.preventDefault();
    // try {
    //   if (firebase) {
    //     const response = await firebase.signUp(email, password);
    //   }
    // } catch {}
    // console.log(history);
    console.log(values);
    history?.push('/logIn');
  };

  const isValidInvitationToken = () => {
    const { REACT_APP_TOKEN } = process.env;
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    return params.token === REACT_APP_TOKEN;
  };

  if (!isValidInvitationToken()) {
    return (
      <div className="layout">
        <div className="form-wrapper">
          <div>
            <h2 style={{ color: 'red', display: 'inline', fontSize: '2em' }}>We are sorry</h2>
            <h2 style={{ display: 'inline', fontSize: '2em' }}>
              , but your invitation token is not valid. Please, ask for valid link to register.
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field
            name="email"
            placeholder="Email"
            component={Input}
            type="email"
            validate={[required, validEmail]}
          />
          <Field
            name="password"
            placeholder="Password"
            component={Input}
            type="password"
            validate={[required, minLength6]}
          />
          <Submit type="submit" className="submit ">
            Submit
          </Submit>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(
  reduxForm<SubmitValues>({ form: 'sign-up' })(withFirebase(SignUp)),
);
