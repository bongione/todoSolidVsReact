import { createSignal, type Component, createMemo } from "solid-js";

import ToDoList from "./TodoList";
import AddToDo from "./AddToDo";
import { useTodosApi } from "./dataprovider";
import FunctionRendersPanel from "./FunctionsRendersPanel";
import { contFnRender } from "./FunctionsRendersProvider";

const App: Component = () => {
  const [doneItemsHidden, setDoneItemsHidden] = createSignal(false);
  const toggleDoneHitems = () => setDoneItemsHidden((hideDone) => !hideDone);
  const {todos} = useTodosApi();
  const visibleTodos = createMemo(() => {
    const items = doneItemsHidden() ? todos.filter(todo => !todo.isChecked) : todos;
    return items;
  });
  contFnRender('Render App');

  return (
    <div class="h-screen w-full px-16 py-8 bg-gray-200 tex-gray-900">
      <div class="w-full h-full flex justify-center overflow-hidden ">
        <div class="w-full flex flex-col items-stretch max-w-lg overflow-hidden">
          <h1 class="flex-grow-0 flex-shrink-0 font-xl mb-4 flex flex-no-wrap">
            <div>SolidJS ToDos</div>
            <div class="ml-6">
              <a
                class="text-sm text-blue-400 hover:text-blue-600 hover:cursor-pointer"
                onclick={toggleDoneHitems}
              >
                {doneItemsHidden() ? "Show done ToDos" : "Hide done ToDos"}
              </a>
            </div>
          </h1>
          <div class="flex-1 overflow-y-auto">
            <ToDoList todos={visibleTodos}/>
          </div>
          <div class="flex-grow-0 flex-shrink-0 mt-4">
            <AddToDo />
          </div>
        </div>
      </div>
      <FunctionRendersPanel />
    </div>
  );
};

export default App;
