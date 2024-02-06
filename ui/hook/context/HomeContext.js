import { createContext, useState } from 'react';

export const HomeContext = createContext();

export const useHomeContext = () => {
  const [homeState, setHomeState] = useState({});

  const updateHomeState = (newState) => {
    setHomeState(newState);
  };

  return {
    homeState,
    updateHomeState,
  };
};
