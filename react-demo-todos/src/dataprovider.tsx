import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  todosIndexes: Map<string, number>;
  changeToDo: (todoId: string, todoChanges: Partial<Omit<ToDo, "id">>) => void;
  deleteToDo: (todoId: string) => void;
}

interface TodoApi {
  todo: ToDo | null;
  changeToDo: (todoChanges: Partial<Omit<ToDo, "id">>) => void;
  deleteToDo: () => void;
}

const TodosDataContext = createContext<DataContextApi>({
  todos: [],
  todosIndexes: new Map(),
  addToDo: () => {},
  changeToDo: () => {},
  deleteToDo: () => {},
});

function DataProvider(props: { children: React.ReactNode }) {
  const storedItems = localStorage.getItem("demoToDos");
  const [todos, setTodos] = useState<ToDo[]>(
    storedItems ? JSON.parse(storedItems) : []
  );

  useEffect(() => {
    localStorage.setItem("demoToDos", JSON.stringify(todos));
  }, [todos]);

  const todosIndexes = useMemo(
    () => new Map(todos.map((todo, index) => [todo.id, index])),
    [todos]
  );
  const refTodosIndexes = useRef(todosIndexes);
  refTodosIndexes.current = todosIndexes;

  function addToDo(todoInfo: Omit<ToDo, "id">) {
    setTodos((todos) => [...todos, { id: generateTodoId(), ...todoInfo }]);
  }

  function changeToDo(todoId: string, todoChanges: Partial<Omit<ToDo, "id">>) {
    const index = refTodosIndexes.current.get(todoId);
    if (typeof index === "number") {
      setTodos((currentTodos) => {
        const updatedTodos = currentTodos.slice();
        updatedTodos[index] = Object.assign(
          {},
          updatedTodos[index],
          todoChanges
        );
        return updatedTodos;
      });
    }
  }

  function deleteToDo(todoId: string) {
    setTodos((todos) => {
      const index = todos.findIndex(todo => todo.id === todoId);
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
  const todo = useMemo(() => {
    const index = todosIndexes.get(todoId);
    return typeof index === "number" ? todos[index] : null;
  }, [todosIndexes, todos, todoId]);

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
