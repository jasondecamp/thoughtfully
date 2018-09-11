import React from 'react';
import { shallow } from 'enzyme';
import { Greeting } from '../../../src/features/home/Greeting';

describe('home/Greeting', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Greeting {...props} />
    );

    expect(
      renderedComponent.find('.home-greeting').length
    ).toBe(1);
  });
});
