import React from 'react';
import { shallow } from 'enzyme';
import { Alerts } from '../../../src/features/core';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Alerts />);
  expect(renderedComponent.find('.core-alerts').length).toBe(1);
});
