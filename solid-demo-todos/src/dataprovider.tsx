import {
  Accessor,
  JSXElement,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { l } from "vite/dist/node/types.d-AKzkD8vd";

export interface ToDo {
  id: string;
  isChecked: boolean;
  text: string;
}

interface PublicDataContexApi {
  todos: ToDo[];
  addToDo: (todoInfo: Omit<ToDo, "id">) => void;
}

interface DataContextApi extends PublicDataContexApi {
  todosIndexes: Accessor<Map<string, number>>;
  changeToDo: (todoId: string, todoChanges: Partial<Omit<ToDo, "id">>) => void;
  deleteToDo: (todoId: string) => void;
}

interface TodoApi {
  todo: Accessor<ToDo | null>;
  changeToDo: (todoChanges: Partial<Omit<ToDo, "id">>) => void;
  deleteToDo: () => void;
}

const TodosDataContext = createContext<DataContextApi>({
  todos: [],
  todosIndexes: () => new Map(),
  addToDo: () => {},
  changeToDo: () => {},
  deleteToDo: () => {},
});

function DataProvider(props: { children: JSXElement }) {
  const storedItems = localStorage.getItem("demoToDos");
  const [todos, setTodos] = createStore<ToDo[]>(
    storedItems ? JSON.parse(storedItems) : []
  );
  console.log(`Todos loaded: `, JSON.stringify(todos));

  createEffect(() => {
    localStorage.setItem("demoToDos", JSON.stringify(todos));
  });

  const todosIndexes = createMemo(
    () => new Map(todos.map((todo, index) => [todo.id, index]))
  );

  function addToDo(todoInfo: Omit<ToDo, "id">) {
    setTodos((todos) => [...todos, { id: generateTodoId(), ...todoInfo }]);
  }

  function changeToDo(todoId: string, todoChanges: Partial<Omit<ToDo, "id">>) {
    const index = todosIndexes().get(todoId);
    if (typeof index === "number") {
      setTodos(index, todoChanges);
    }
  }

  function deleteToDo(todoId: string) {
    setTodos((todos) => {
      const index = todosIndexes().get(todoId);
      if (typeof index === "number") {
        const updatedToDos = todos.slice();
        updatedToDos.splice(index, 1);
        return updatedToDos;
      } else {
        return todos;
      }
    });
  }

  return (
    <TodosDataContext.Provider
      value={{ addToDo, changeToDo, deleteToDo, todos, todosIndexes }}
    >
      {props.children}
    </TodosDataContext.Provider>
  );
}

export function useTodosApi(): PublicDataContexApi {
  const { addToDo, todos } = useContext(TodosDataContext);
  return {
    addToDo,
    todos,
  };
}

export function useTodoApi(todoId: string): TodoApi {
  const {
    todos,
    todosIndexes,
    changeToDo: outerChangeToDo,
    deleteToDo: outerDeleteToDo,
  } = useContext(TodosDataContext);
  const todo = createMemo(() => {
    const index = todosIndexes().get(todoId);
    return typeof index === "number" ? todos[index] : null;
  });

  function changeToDo(todoChanges: Partial<Omit<ToDo, "id">>) {
    outerChangeToDo(todoId, todoChanges);
  }

  function deleteToDo() {
    outerDeleteToDo(todoId);
  }

  return {
    todo,
    changeToDo,
    deleteToDo,
  };
}

function generateTodoId() {
  const now = new Date();
  const randN = Math.floor(Math.random() * 1000000);
  return `todo_${now.getTime()}.${randN}`;
}

export default DataProvider;
