import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('should have header text', () => {
    render(<Home />);
    const header = screen.getByText('To-Do App');
    expect(header).toBeInTheDocument();
  });
});

