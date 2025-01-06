import React from 'react';
import { render } from '@testing-library/react';
import Notification from '../index';

describe('Renders Notification', () => {
  it('should render Notification correctly', () => {
    const component = render(<Notification />);
    expect(component).toMatchSnapshot();
  });
});
