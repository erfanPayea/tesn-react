// A custom hook that uses useState and localStorage
import {useEffect, useState} from "react";

function useLocalStorageState(key, defaultValue) {
  // Get the initial value from localStorage or the default value
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  });

  // Update the state and localStorage when the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // Return the same interface as useState
  return [state, setState];
}

export default useLocalStorageState;