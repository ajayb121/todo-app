import { useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { TodoInterface } from '@/types/todo';

interface TodoListProps {
  todos: TodoInterface[];
  removeTodo: (index: string) => void;
  toggleComplete: (index: string) => void;
  removeCompleted: () => void;
}

// Enumeration for filtering todos
enum FILTERED_STATE {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
};

const TodoList = ({ todos, removeTodo, toggleComplete, removeCompleted }: TodoListProps): JSX.Element => {
  const [filteredState, setFilteredState] = useState<FILTERED_STATE>(FILTERED_STATE.ALL);

  // Filter the todos based on the selected filter
  const updatedTodos: TodoInterface[] = todos.filter(({ isComplete }) => {
    if (filteredState === FILTERED_STATE.ALL) {
      return true;
    } else if (filteredState === FILTERED_STATE.ACTIVE) {
      return !isComplete;
    } else {
      return isComplete;
    }
  });

  // Handle the change of the selected filter
  const handleFilterChange = (filter: FILTERED_STATE) => {
    setFilteredState(filter);
  }

  return (
    <div className='mt-4 border border-gray-700 rounded-b' data-testid="todo-list">
      <ul className='bg-slate-50 max-h-96 overflow-y-scroll'>
        {updatedTodos.map(({ id, title, isComplete }) => (
          <li key={id} className='flex flex-row w-full justify-between p-4  border-solid border-b border-gray-700 last:border-0'>
            <div className='h-full flex align-middle'>
              <button onClick={() => toggleComplete(id)} className='pr-2 w-10' aria-label='toggle isItem complete'>
                {isComplete ? <div><CheckCircleIcon className="h-7 w-7 text-green-600" /></div> : <div className="h-6 w-6 rounded-full border border-gray-700" />}
              </button>
              <p className={`text-lg ${isComplete ? 'line-through text-slate-500' : 'text-slate-800'}`}>{title}</p>
            </div>
            <div>
              <button onClick={() => removeTodo(id)} aria-label='remove todo item'>
                <XMarkIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </li>
        ))}

        {/* Display a message if the list is empty */}
        {!updatedTodos.length && (
          <li className='w-full p-4 bg-slate-50 h-48'>
            <p className='text-lg'>No Items in the list</p>
          </li>
        )}
      </ul>

      <div className='bg-gray-300 text-lg font-semibold flex justify-between items-center p-4 rounded-b flex-col sm:flex-row border-solid border-t border-gray-700'>
        <div className='pb-2 sm:pb-0'>
          {Object.values(FILTERED_STATE).map((filter) => (
            <button
              key={filter}
              className={`mr-2 ${filteredState === filter ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleFilterChange(filter)}
              aria-label={`apply filter ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div>
          <button className='text-gray-600 hover:text-gray-800' onClick={removeCompleted} aria-label='clear completed todos'>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;

