import { useState, ChangeEvent, FormEvent } from "react";

interface TodoInputProps {
  onAdd: (inputText: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps): JSX.Element => {
  const [inputText, setInputText] = useState("");

  // Handler for input text change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Handler for adding a new todo
  const addToDo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText) {
      onAdd(inputText); // Call the onAdd function to add the new todo
      setInputText(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={addToDo} className="w-full flex">
      <input
        type="text"
        className="border border-gray-700 rounded p-3 sm:p-4 text-md sm:text-lg grow"
        placeholder="Add a new todo"
        value={inputText}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="p-3 sm:py-4 sm:px-6 rounded text-md sm:text-lg ml-3 bg-violet-600 text-slate-50 font-semibold hover:bg-violet-700"
      >
        Submit
      </button>
    </form>
  );
}

export default TodoInput;