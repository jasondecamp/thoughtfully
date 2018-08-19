import React from 'react';
import { shallow } from 'enzyme';
import { LoginModal } from '../../../src/features/auth/LoginModal';

describe('auth/LoginModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginModal {...props} />
    );

    expect(
      renderedComponent.find('.auth-login-modal').length
    ).toBe(1);
  });
});
