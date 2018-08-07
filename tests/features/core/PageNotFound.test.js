import React from 'react';
import { shallow } from 'enzyme';
import { PageNotFound } from '../../../src/features/core';

describe('core/PageNotFound', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<PageNotFound />);

    expect(renderedComponent.find('.core-page-not-found').length).toBe(1);
  });
});
