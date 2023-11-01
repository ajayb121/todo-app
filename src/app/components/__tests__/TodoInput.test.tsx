import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoInput from '../TodoInput';

const onAddMock = jest.fn();

describe('Todo Input Component', () => {

  it('Renders correctly', () => {
    render(<TodoInput onAdd={onAddMock} />);

    // Ensure that the input field and submit button are present
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('Handles input change', () => {
    render(<TodoInput onAdd={onAddMock} />);
    const inputField = screen.getByPlaceholderText('Add a new todo') as HTMLInputElement;

    // Simulate a user entering text in the input field
    fireEvent.change(inputField, { target: { value: 'New Todo' } });

    // Ensure that the input field value is updated
    expect(inputField.value).toBe('New Todo');
  });

  it('Adds a new todo on form submission', () => {
    render(<TodoInput onAdd={onAddMock} />);
    const inputField = screen.getByPlaceholderText('Add a new todo') as HTMLInputElement;
    const submitButton = screen.getByText('Submit');

    // Simulate a user entering text and submitting the form
    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(submitButton);

    // Ensure that the onAdd function is called with the correct input text
    expect(onAddMock).toHaveBeenCalledWith('New Todo');

    // Ensure that the input field is cleared after submission
    expect(inputField.value).toBe('');
  });
});