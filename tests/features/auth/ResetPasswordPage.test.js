import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordPage } from '../../../src/features/auth/ResetPasswordPage';

describe('auth/ResetPasswordPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResetPasswordPage {...props} />
    );

    expect(
      renderedComponent.find('.auth-reset-password-page').length
    ).toBe(1);
  });
});
