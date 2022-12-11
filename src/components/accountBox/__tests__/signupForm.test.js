import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import signupForm from '../signupForm';
import 'jest-styled-components';

test('it works', () => {
  const tree = renderer.create(<signupForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
