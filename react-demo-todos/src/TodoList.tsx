import React from "react";
import { ToDo} from "./dataprovider";
import ToDoItem from "./ToDoItem";
import { countFnRender } from "./FunctionsRendersProvider";

export default function ToDoList(props: { todos: ToDo[] }) {
  countFnRender("ToDoList");
  return (
    <div className="mb-4">
      {props.todos.length === 0 ? (
        <div className="text-gray-600 font-italic">No todo items yet</div>
      ) : (
        props.todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
