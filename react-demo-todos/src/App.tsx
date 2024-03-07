import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { countFnRender } from './FunctionsRendersProvider';
import ToDoList from './TodoList';
import { useTodosApi } from './dataprovider';
import AddToDo from './AddToDo';

function App() {
  countFnRender('App');
  const [doneItemsHidden, setDoneItemsHidden] = useState(false);
  const toggleDoneHitems = () => setDoneItemsHidden((hideDone) => !hideDone);
  const {todos} = useTodosApi();
  const visibleTodos = useMemo(() => {
    const items = doneItemsHidden ? todos.filter(todo => !todo.isChecked) : todos;
    return items;
  }, [doneItemsHidden, todos]);
  
  return (
    <div className="h-screen w-full px-16 py-8 bg-gray-200 tex-gray-900">
      <div className="w-full h-full flex justify-center overflow-hidden ">
        <div className="w-full flex flex-col items-stretch max-w-lg overflow-hidden">
          <h1 className="flex-grow-0 flex-shrink-0 font-xl mb-4 flex flex-no-wrap">
            <div>React ToDos</div>
            <div className="ml-6">
              <a
                className="text-sm text-blue-400 hover:text-blue-600 hover:cursor-pointer"
                onClick={toggleDoneHitems}
              >
                {doneItemsHidden ? "Show done ToDos" : "Hide done ToDos"}
              </a>
            </div>
          </h1>
          <div className="flex-1 overflow-y-auto">
            <ToDoList todos={visibleTodos}/>
          </div>
          <div className="flex-grow-0 flex-shrink-0 mt-4">
            <AddToDo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
