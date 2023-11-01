import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from '../Todo';

describe('Todo Component', () => {

  it('Renders correctly', () => {
    render(<Todo />);

    // Ensure that the "TodoInput" and "TodoList" components are rendered
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  it('Adds a new todo', () => {
    render(<Todo />);

    // Add a new todo
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Ensure that the new todo is displayed
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('Removes a todo', () => {
    render(<Todo />);

    // Add a new todo
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Remove the new todo
    const removeButton = screen.getAllByLabelText('remove todo item');
    fireEvent.click(removeButton[0]);

    // Ensure that the new todo is removed
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });

  it('Toggles the completion status of a todo', () => {
    render(<Todo />);

    // Add a new todo
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Toggle the completion status of the new todo
    const toggleButton = screen.getAllByLabelText('toggle isItem complete');
    fireEvent.click(toggleButton[0]);

    // Ensure that the new todo is marked as complete
    expect(screen.getByText('New Todo')).toHaveClass('line-through');
  });

  it('Removes completed todos', () => {
    render(<Todo />);

    // Add a new completed todo
    const inputField = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.change(inputField, { target: { value: 'New Completed Todo' } });
    fireEvent.click(addButton);

    // Mark new todo as complete
    const toggleButton = screen.getAllByLabelText('toggle isItem complete');
    fireEvent.click(toggleButton[0]);

    // Remove completed todos
    const removeCompletedButton = screen.getByText('Remove Completed');
    fireEvent.click(removeCompletedButton);

    // Ensure that the completed todo is removed
    expect(screen.queryByText('New Completed Todo')).not.toBeInTheDocument();
  });
});
