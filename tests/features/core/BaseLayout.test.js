import React from 'react';
import { shallow } from 'enzyme';
import { BaseLayout } from '../../../src/features/core';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<BaseLayout />);
  expect(renderedComponent.find('.core-base-layout').length).toBe(1);
});
