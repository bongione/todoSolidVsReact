import React, { useRef, useState } from "react";
import { useTodosApi } from "./dataprovider";
import { countFnRender } from "./FunctionsRendersProvider";

function AddToDo() {
  countFnRender('AddToDo');
  const [text, setText] = useState("");
  const { addToDo } = useTodosApi();
  const refText = useRef(text);
  refText.current = text;

  function handleAddItem() {
    if (text.trim().length > 0) {
      addToDo({ isChecked: false, text });
    }
    setText("");
  }

  return (
    <div className="flex flex-no-wrap">
      <div className="mr-2">
        <input className="py-1 px-3" type="text" onInput={(e) => setText(e.currentTarget.value)} value={text} />
      </div>
      <div>
        <button className="px-3 py-1 bg-blue-300 hover:cursor-pointer hover:bg-blue-400 text-white" onClick={handleAddItem}>Add item</button>
      </div>
    </div>
  );
}

export default AddToDo;
