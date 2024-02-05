import { useState } from 'react';

export const useGlobalState = (initial) => {
  const [globalState, setGlobalState] = useState(initial);
  return [globalState, setGlobalState];
};
