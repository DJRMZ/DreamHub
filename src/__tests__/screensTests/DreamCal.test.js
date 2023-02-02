import React from 'react';
import { render } from '@testing-library/react-native';
import DreamCalendar from '../Components/DreamCalendar';
import Calendar from '../../Screens/DreamCal';

describe('Calendar', () => {
  it('renders calendar text', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Calendar')).toBeTruthy();
  });

  it('renders DreamCalendar component', () => {
    const { getByTestId } = render(<Calendar />);
    expect(getByTestId('dream-calendar')).toBeTruthy();
  });
});
