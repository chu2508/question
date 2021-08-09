import { useCallback, useEffect, useRef } from "react";

export default function useDebounce<T extends Function = (...arg: any[]) => any>(fn: T, delay: number) {
  const { current } = useRef({ fn, timer: -1 });
  useEffect(
    function () {
      current.fn = fn;
    },
    [current.fn, fn]
  );

  return useCallback(
    function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(null, ...args);
      }, delay) as any;
    },
    [current.fn, current.timer, delay]
  );
}
