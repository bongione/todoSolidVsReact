import { contFnRender } from "./FunctionsRendersProvider";
import { ToDo, useTodoApi } from "./dataprovider";

function ToDoItem(props: {todo: ToDo}) {
    const {changeToDo, deleteToDo} = useTodoApi(props.todo.id);
    contFnRender(`ToDoItem ${props.todo.id}`) ;

    if (!props.todo) {
        return null;
    }

    function toggleToDo() {
        changeToDo({isChecked: !props.todo.isChecked});
    }

    return (
        <div class="w-full flex flex-no-wrap">
              <div class="mr-4 flex-shrink-0 flex-grow-0">
                <input type="checkbox" checked={props.todo.isChecked} onchange={toggleToDo}/>
              </div>
              <div class="mr-4 flex-1">{props.todo.text}</div>
                <div class="flex-shrink-0 flex-grow-0">
                    <a class="text-blue-300 underline hover:cursor-pointer hover:text-blue-500" onclick={deleteToDo}>Delete</a>
                </div>
            </div>
    );
}

export default ToDoItem;
