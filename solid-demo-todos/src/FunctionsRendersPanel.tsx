import { For, JSXElement } from "solid-js";
import { Portal } from "solid-js/web";
import { useFnRenders } from "./FunctionsRendersProvider";

function FunctionRendersPanel() {
  const functionsRenderCount = useFnRenders();

  return (
    <Portal mount={document.getElementById("logging")!}>
      <div class="fixed right-0 bottom-0 w-sm h-2/12 overflow-auto shadow text-sm p-2">
        <h1>Function Renders</h1>
        <For each={functionsRenderCount()}>
          {(fnRenderCount) => <div class="text-gray-700 text-sm">{fnRenderCount.renderFnName} : {fnRenderCount.nRenders} </div>}
        </For>
      </div>
    </Portal>
  );
}

export default FunctionRendersPanel;
