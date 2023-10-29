import { useState, ChangeEvent, FormEvent } from "react";

interface TodoInputProps {
  onAdd: (inputText: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps): JSX.Element => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const addToDo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText) {
      onAdd(inputText);
      setInputText("");
    }
  };

  return (
    <form onSubmit={addToDo}>
      <input
        type="text"
        className="border border-gray-700 rounded p-4 w-full text-lg"
        placeholder="Add a new todo"
        value={inputText}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default TodoInput;