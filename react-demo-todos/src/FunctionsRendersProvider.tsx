import React, { createContext, useContext, useEffect, useState } from "react";

interface ComponentRenders {
  renderFnName: string;
  nRenders: number;
}

interface ComponentRendersApi {
  functionNRenders: ComponentRenders[];
}

const LogContext = createContext<ComponentRendersApi>({
  functionNRenders: []
});

let _fnsRenders: ComponentRenders[] = [];

export function countFnRender(renderFnName: string) {
  _fnsRenders = _fnsRenders.slice();
  let index = _fnsRenders.findIndex(
    (fnRenderCount) => fnRenderCount.renderFnName === renderFnName
  );
  if (index === -1) {
    _fnsRenders.push({ nRenders: 1, renderFnName: renderFnName });
  } else {
    _fnsRenders[index] = Object.assign({}, _fnsRenders[index]);
    _fnsRenders[index].nRenders++;
  }
}

function FunctionRendersProvider(props: { children: React.ReactNode }) {
  const [fnsRenders, setFnsRenders] = useState<ComponentRenders[]>(_fnsRenders);
  useEffect(() => {
    const timerId = setInterval(() => setFnsRenders(_fnsRenders), 500);
    return () => clearInterval(timerId);
  }, []);


  return (
    <LogContext.Provider value={{ functionNRenders: fnsRenders }}>
      {props.children}
    </LogContext.Provider>
  );
}

export function useFnRenders() {
  const { functionNRenders } = useContext(LogContext);
  return functionNRenders;
}

export default FunctionRendersProvider;
