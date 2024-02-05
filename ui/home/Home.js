import { Divider } from '@mui/material';
import React, { memo, useState } from 'react';
import { PeopleTable } from '../component/datagrid/PeopleTable';
import { EventSelector } from '../component/selector/EventSelector';
import { EventPeopleCounter } from '../component/display/EventPeopleCounter';
import { Conteiner } from '../component/conteiner/Conteiner';
import { HomeContext } from '../hook/context/HomeContext';

export const Home = memo(() => {
  const [homeState, setHomeState] = useState({});

  const updateHomeState = (newState) => {
    setHomeState(newState);
  };

  return (
    <Conteiner>
      <HomeContext.Provider value={{ homeState, updateHomeState }}>
        <Divider className="mt-4 mb-2" />
        <EventSelector />
        <EventPeopleCounter />
        <PeopleTable />
      </HomeContext.Provider>
    </Conteiner>
  );
});
