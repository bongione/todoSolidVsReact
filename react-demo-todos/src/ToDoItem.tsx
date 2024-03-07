import React from "react";
import { countFnRender } from "./FunctionsRendersProvider";
import { ToDo, useTodoApi } from "./dataprovider";

function ToDoItem(props: { todo: ToDo }) {
  const { changeToDo, deleteToDo } = useTodoApi(props.todo.id);
  countFnRender(`ToDoItem ${props.todo.id}`);
  
  if (!props.todo) {
    return null;
  }

  function toggleToDo() {
    changeToDo({ isChecked: !props.todo.isChecked });
  }

  return (
    <div className="w-full flex flex-no-wrap">
      <div className="mr-4 flex-shrink-0 flex-grow-0">
        <input
          type="checkbox"
          checked={props.todo.isChecked}
          onChange={toggleToDo}
        />
      </div>
      <div className="mr-4 flex-1">{props.todo.text}</div>
      <div className="flex-shrink-0 flex-grow-0">
        <a
          className="text-blue-300 underline hover:cursor-pointer hover:text-blue-500"
          onClick={deleteToDo}
        >
          Delete
        </a>
      </div>
    </div>
  );
}

export default ToDoItem;
