import React from 'react';
import { reduxForm, InjectedFormProps, Form, Field, FormSubmitHandler } from 'redux-form';
import { useHistory } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import Input from 'components/Form/Input/Input';
import { WithFirebase } from 'components/Firebase/FirebaseHOC';
import { required, validEmail, minLength6 } from 'lib/validation';
import { Submit } from 'pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { logInAction } from 'store/common/actions';
import { getUserIsLoading } from 'store/common/selectors';
import { RootState } from 'store/domain';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled from 'styled-components';

const SubmitText = styled.span`
  height: 30px;
  width: 72px;
  overflow: hidden;
  & .spinner {
    max-height: 30px;
    width: 72px;
  }
`;

interface SubmitValues {
  email: string;
  password: string;
}

interface OwnProps extends InjectedFormProps<SubmitValues>, WithFirebase {}

const mapStateToProps = (state: RootState) => ({
  isLoading: getUserIsLoading(state),
});

const LogIn: React.FC<OwnProps> = (props) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(mapStateToProps);
  const history = useHistory();
  const { firebase, handleSubmit } = props;

  const onSubmit: FormSubmitHandler<SubmitValues> = (values) => {
    if (!isLoading) {
      dispatch(logInAction({ ...values, firebase, history }));
    }
  };

  return (
    <div className="layout">
      <div className="form-wrapper">
        <h1>Log In</h1>
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
            <SubmitText>
              {isLoading ? (
                <Loader
                  // @ts-ignore
                  className="spinner"
                  type="TailSpin"
                  color="#0CCE6B"
                  height={30}
                  width={30}
                />
              ) : (
                'Submit'
              )}
            </SubmitText>
          </Submit>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(
  reduxForm<SubmitValues>({ form: 'log-in' })(withFirebase(LogIn)),
);
