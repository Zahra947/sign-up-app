import React, { useContext } from 'react';
import { useFormik } from 'formik';
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from './common';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//not render every time so validation schema defines here//
const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Please enter your full name')
    .required('Full name is required'),
  email: yup.string().email('Please enter a valid email address').required(),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, 'Please enter a strong password')
    .required(),
  confirmPassword: yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref('password')], 'Password does not match'),
  }),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.fullName && formik.errors.fullName
              ? formik.errors.fullName
              : ''}
          </FieldError>
        </FieldContainer>
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
        <FieldContainer>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''}
          </FieldError>
        </FieldContainer>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" disabled={!formik.isValid}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
