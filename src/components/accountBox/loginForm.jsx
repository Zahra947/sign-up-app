import React, { useContext } from 'react';
import { useFormik } from 'formik';
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FormContainer,
  FieldError,
  Input,
  MutedLink,
  SubmitButton,
} from './common';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  });

  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''}
          </FieldError>
        </FieldContainer>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" disabled={!formik.isValid}>
        Signin
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{' '}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
