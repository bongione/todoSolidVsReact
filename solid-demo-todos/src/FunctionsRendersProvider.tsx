import {
  Accessor,
  For,
  JSXElement,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { Portal } from "solid-js/web";

interface ComponentRenders {
  renderFnName: string;
  nRenders: number;
}

interface ComponentRendersApi {
  functionNRenders: Accessor<ComponentRenders[]>;
  countRender: (fnName: string) => void;
}

const LogContext = createContext<ComponentRendersApi>({
  functionNRenders: () => [],
  countRender: () => {},
});

function FunctionRendersProvider(props: { children: JSXElement }) {
  const [fnsRenders, setFnsRenders] = createSignal<ComponentRenders[]>([]);
  function countRender(renderFnName: string) {
    setFnsRenders((renderFns) => {
      const newRenderFns = renderFns.slice();
      let index = newRenderFns.findIndex(
        (fnRenderCount) => fnRenderCount.renderFnName === renderFnName
      );
      if (index === -1) {
        newRenderFns.push({ nRenders: 1, renderFnName: renderFnName });
      } else {
        newRenderFns[index] = Object.assign({}, newRenderFns[index]);
        newRenderFns[index].nRenders++;
      }
      return newRenderFns;
    });
  }

  return (
    <LogContext.Provider value={{ countRender, functionNRenders: fnsRenders }}>
      {props.children}
    </LogContext.Provider>
  );
}

export function contFnRender(fnName: string) {
  const { countRender } = useContext(LogContext);
  countRender(fnName);
}

export function useFnRenders() {
  const { functionNRenders } = useContext(LogContext);
  return functionNRenders;
}

export default FunctionRendersProvider;
