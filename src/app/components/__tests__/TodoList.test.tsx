import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { TodoInterface } from '@/types/todo';

const mockTodos: TodoInterface[] = [
  {
    id: '1',
    title: 'Todo 1',
    isComplete: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    isComplete: true,
  },
  {
    id: '3',
    title: 'Todo 3',
    isComplete: false,
  },
];

const onRemoveTodo = jest.fn();
const onToggleComplete = jest.fn();
const onRemoveCompleted = jest.fn();

describe('Todo List Component', () => {

  it('Renders correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        removeTodo={onRemoveTodo}
        toggleComplete={onToggleComplete}
        removeCompleted={onRemoveCompleted}
      />
    );

    // Ensure that the list of todos is rendered
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  it('Filters todos correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        removeTodo={onRemoveTodo}
        toggleComplete={onToggleComplete}
        removeCompleted={onRemoveCompleted}
      />
    );

    // Select the "Active" filter
    fireEvent.click(screen.getByText('Active'));

    // Ensure that "Active" filter shows only incomplete todos
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();

    // Select the "Completed" filter
    fireEvent.click(screen.getByText('Completed'));

    // Ensure that "Completed" filter shows only completed todos
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Todo 3')).not.toBeInTheDocument();
  });

  it('Toggles Complete item', () => {
    render(
      <TodoList
        todos={mockTodos}
        removeTodo={onRemoveTodo}
        toggleComplete={onToggleComplete}
        removeCompleted={onRemoveCompleted}
      />
    );

    fireEvent.click(screen.getAllByLabelText('toggle isItem complete')[0]);

    // Ensure that the onToggleComplete function is called
    expect(onToggleComplete).toHaveBeenCalled();
  });

  it('Removes todo item', () => {
    render(
      <TodoList
        todos={mockTodos}
        removeTodo={onRemoveTodo}
        toggleComplete={onToggleComplete}
        removeCompleted={onRemoveCompleted}
      />
    );

    fireEvent.click(screen.getAllByLabelText('remove todo item')[0]);

    // Ensure that the onRemoveTodo function is called
    expect(onRemoveTodo).toHaveBeenCalled();
  });

  it('Removes Completed item', () => {
    render(
      <TodoList
        todos={mockTodos}
        removeTodo={onRemoveTodo}
        toggleComplete={onToggleComplete}
        removeCompleted={onRemoveCompleted}
      />
    );

    // Remove completed todos
    const removeCompletedButton = screen.getByText('Remove Completed');
    fireEvent.click(removeCompletedButton);

    // Ensure that the onRemoveCompleted function is called
    expect(onRemoveCompleted).toHaveBeenCalled();
  });

});