export const useMemoPolyFill = (fn, deps) => {
  const memoizedValue = useRef(undefined);
  const previousDeps = useRef(undefined);

  if (!previousDeps || deps.some((val, i) => val !== previousDeps.current[i])) {
    memoizedValue.current = fn();
    previousDeps.current = deps;
  }

  return memoizedValue.current;
};
