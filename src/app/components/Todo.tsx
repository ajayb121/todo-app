"use client"; // This is a client component

import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoInterface } from '@/types/todo';

// Initial mock data for todos
const mockTodoData: TodoInterface[] = [{
  id: 4,
  title: 'Todo item 1',
  isComplete: false,
}, {
  id: 3,
  title: 'Completed item 1',
  isComplete: true,
}, {
  id: 2,
  title: 'Completed item 2',
  isComplete: true,
}, {
  id: 1,
  title: 'Todo item 2',
  isComplete: false,
}];

export default function Todo() {
  // State to manage the list of todos
  const [todos, setTodos] = useState<TodoInterface[]>(mockTodoData);

  // Function to add a new todo
  const addTodo = (title: string): void => {
    // setting an id for each todo item
    const todoId = todos.length ? todos[0].id + 1 : 1;
    const todoItem = {
      id: todoId,
      title,
      isComplete: false,
    }

    // appending it to the todos state
    setTodos([
      todoItem,
      ...todos,
    ]);
  };

  // Function to remove a todo
  const removeTodo = (itemId: number): void => {
    const updatedTodos = [...todos];

    // Find the index of the todo with the given id and remove it from the list
    const index = updatedTodos.findIndex(({ id }) => id === itemId);
    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (itemId: number): void => {
    const updatedTodos = [...todos];

    // Find the index of the todo with the given id and toggle its 'isComplete' value
    const index = updatedTodos.findIndex(({ id }) => id === itemId);
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete;

    setTodos(updatedTodos);
  };

  // Function to remove completed todos
  const removeCompleted = (): void => {
    // Filter out completed todos from the list and update the todos state
    const updatedTodos = todos.filter(({ isComplete }) => !isComplete);
    setTodos(updatedTodos);
  }

  return (
    <>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete} removeCompleted={removeCompleted} />
    </>
  );
}