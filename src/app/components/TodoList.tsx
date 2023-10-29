import { useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { TodoInterface } from '@/types/todo';

interface TodoListProps {
  todos: TodoInterface[];
  removeTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
  removeCompleted: () => void;
}

enum FILTERED_STATE {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
};

const TodoList = ({ todos, removeTodo, toggleComplete, removeCompleted }: TodoListProps): JSX.Element => {
  const [filteredState, setFilteredState] = useState<FILTERED_STATE>(FILTERED_STATE.ALL);

  const updatedTodos: TodoInterface[] = todos.filter(({ isComplete }) => {
    if (filteredState === FILTERED_STATE.ALL) {
      return true;
    } else if (filteredState === FILTERED_STATE.ACTIVE) {
      return !isComplete;
    } else {
      return isComplete;
    }
  });

  const handleFilterChange = (filter: FILTERED_STATE) => {
    setFilteredState(filter);
  }

  return (
    <div className='mt-4 border border-gray-700 rounded-b'>
      <ul className='bg-slate-100 max-h-96 overflow-y-scroll'>
        {updatedTodos.map(({ id, title, isComplete }) => (
          <li key={id} className='flex flex-row w-full justify-between p-4  border-solid border-b border-gray-700 last:border-0'>
            <div className='h-full flex align-middle'>
              <button onClick={() => toggleComplete(id)} className='pr-2 w-10'>
                {isComplete ? <div><CheckCircleIcon className="h-7 w-7 text-blue-500" /></div> : <div className="h-6 w-6 rounded-full border border-gray-700" />}
              </button>
              <h3 className={`text-lg ${isComplete ? 'line-through text-slate-500' : 'text-slate-800'}`}>{title}</h3>
            </div>
            <div>
              <button onClick={() => removeTodo(id)}>
                <XMarkIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
              </button>
            </div>
          </li>
        ))}

        {/* display message if list is empty */}
        {!updatedTodos.length && (
          <li className='w-full p-4 bg-slate-100'>
            No Items in the list
          </li>
        )}
      </ul>

      <div className='bg-slate-100 flex justify-between items-center p-4 rounded-b flex-col sm:flex-row border-solid border-t border-gray-700'>
        <div className='pb-2 sm:pb-0'>
          {Object.values(FILTERED_STATE).map((filter) => (
            <button
              key={filter}
              className={`mr-2 font-semibold ${filteredState === filter ? 'text-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div>
          <button className='font-semibold text-gray-600 hover:text-gray-800' onClick={removeCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;

