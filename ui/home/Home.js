import { Divider } from '@mui/material';
import React from 'react';
import { PeopleTable } from '../component/datagrid/PeopleTable';
import { EventSelector } from '../component/selector/EventSelector';
import { EventPeopleCounter } from '../component/display/EventPeopleCounter';
import { Conteiner } from '../component/conteiner/Conteiner';
import { HomeContext, useHomeContext } from '../hook/context/HomeContext';

export const Home = () => {
  const { homeState, updateHomeState } = useHomeContext();
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
};
