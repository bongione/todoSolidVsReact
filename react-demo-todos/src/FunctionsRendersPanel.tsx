import React from "react";
import { useFnRenders } from "./FunctionsRendersProvider";

function FunctionRendersPanel() {
  const functionsRenderCount = useFnRenders();

  return (
    <div className="fixed right-0 bottom-0 w-sm h-2/12 overflow-auto shadow text-sm p-2">
      <h1>Function Renders</h1>

      {functionsRenderCount.map((fnRenderCount, index) => (
        <div
          className="text-gray-700 text-sm"
          key={`${fnRenderCount.renderFnName}.${index}`}
        >
          {fnRenderCount.renderFnName} : {fnRenderCount.nRenders}{" "}
        </div>
      ))}
    </div>
  );
}

export default FunctionRendersPanel;
