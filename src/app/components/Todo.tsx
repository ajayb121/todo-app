"use client"; // This is a client component

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoInterface } from '@/types/todo';

// Initial mock data for todos
const mockTodoData: TodoInterface[] = [{
  id: '1',
  title: 'Todo fourth item',
  isComplete: false,
}, {
  id: '2',
  title: 'Completed third item',
  isComplete: true,
}, {
  id: '3',
  title: 'Completed second item',
  isComplete: true,
}, {
  id: '4',
  title: 'Todo first item',
  isComplete: false,
}];

export default function Todo() {
  // State to manage the list of todos
  const [todos, setTodos] = useState<TodoInterface[]>(mockTodoData);

  // Function to add a new todo
  const addTodo = (title: string): void => {
    // setting an id for each todo item
    const todoId = uuidv4();
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
  const removeTodo = (itemId: string): void => {
    const updatedTodos = [...todos];

    // Find the index of the todo with the given id and remove it from the list
    const index = updatedTodos.findIndex(({ id }) => id === itemId);
    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (itemId: string): void => {
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