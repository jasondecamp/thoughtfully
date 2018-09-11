import React from 'react';
import { shallow } from 'enzyme';
import { LogoutButton } from '../../../src/features/auth/LogoutButton';

describe('auth/LogoutButton', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LogoutButton {...props} />
    );

    expect(
      renderedComponent.find('.auth-logout-button').length
    ).toBe(1);
  });
});
