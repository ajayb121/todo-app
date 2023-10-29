"use client"; // This is a client component

import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoInterface } from '@/types/todo';

export default function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  const addTodo = (title: string): void => {
    // setting an id for each todo item
    const todoId = todos.length ? todos[todos.length - 1].id + 1 : 1;
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

  const removeTodo = (itemId: number): void => {
    const updatedTodos = [...todos];

    // find index of the id and remove it from the list
    const index = updatedTodos.findIndex(({ id }) => id === itemId);
    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);
  };

  const toggleComplete = (itemId: number): void => {
    const updatedTodos = [...todos];

    // find index of the id and toggle isComplete value
    const index = updatedTodos.findIndex(({ id }) => id === itemId);
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete;

    setTodos(updatedTodos);
  };

  const removeCompleted = (): void => {
    // filter completed todos from the list and update todos
    const updatedTodos = todos.filter(({ isComplete }) => !isComplete);
    setTodos(updatedTodos);
  }

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete} removeCompleted={removeCompleted} />
    </div>
  );
}