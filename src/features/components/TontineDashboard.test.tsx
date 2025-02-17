import { render, screen } from '@testing-library/react';
import TontineDashboard from '../TontineDashboard';

describe('TontineDashboard', () => {
  it('renders dashboard components', () => {
    render(<TontineDashboard />);
    expect(screen.getByText('Vue d\'ensemble')).toBeInTheDocument();
  });
});