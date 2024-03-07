import { Accessor, For } from "solid-js";
import { ToDo, useTodosApi } from "./dataprovider";
import ToDoItem from "./ToDoItem";
import { contFnRender } from "./FunctionsRendersProvider";

export default function ToDoList(props: { todos: Accessor<ToDo[]> }) {
  contFnRender("ToDoList");
  return (
    <div class="mb-4">
      {props.todos().length === 0 ? (
        <div class="text-gray-600 font-italic">No todo items yet</div>
      ) : (
        <For each={props.todos()}>{(todo) => <ToDoItem todo={todo} />}</For>
      )}
    </div>
  );
}
