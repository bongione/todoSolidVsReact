import { createSignal } from "solid-js";
import { useTodosApi } from "./dataprovider";

function AddToDo() {
  const [text, setText] = createSignal("");
  const { addToDo } = useTodosApi();
  

  function handleAddItem() {
    if (text().trim().length > 0) {
      addToDo({ isChecked: false, text: text() });
    }
    setText("");
  }

  return (
    <div class="flex flex-no-wrap">
      <div class="mr-2">
        <input class="py-1 px-3" type="text" oninput={(e) => setText(e.target.value)} value={text()} />
      </div>
      <div>
        <button class="px-3 py-1 bg-blue-300 hover:cursor-pointer hover:bg-blue-400 text-white" onclick={handleAddItem}>Add item</button>
      </div>
    </div>
  );
}

export default AddToDo;
