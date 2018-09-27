import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPasswordModal } from '../../../src/features/auth/ForgotPasswordModal';

describe('auth/ForgotPasswordModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ForgotPasswordModal {...props} />
    );

    expect(
      renderedComponent.find('.auth-forgot-password-modal').length
    ).toBe(1);
  });
});
