import { useEffect, useReducer } from "react";
import { TaskAction } from "../types/TaskTypes";

const useLocalStorage = <T>(
  key: string,
  reducer: (state: T, action: TaskAction) => T,
  initialState: T
) => {
  const storedValue = localStorage.getItem(key);
  const [state, dispatch] = useReducer(
    reducer,
    storedValue ? JSON.parse(storedValue) : initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch] as const;
};

export default useLocalStorage;
