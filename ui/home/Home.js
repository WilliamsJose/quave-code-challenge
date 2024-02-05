import { Divider } from '@mui/material';
import React from 'react';
import { PeopleTable } from '../component/datagrid/PeopleTable';
import { EventSelector } from '../component/selector/EventSelector';
import { EventPeopleCounter } from '../component/display/EventPeopleCounter';
import { Conteiner } from '../component/conteiner/Conteiner';
import { useGlobalState } from '../hook/shared/globalState';

export const Home = () => {
  // to share state between components, maybe an lib can do better, like redux
  const [globalState, setGlobalState] = useGlobalState({});

  return (
    <Conteiner>
      <Divider className="mt-4 mb-2" />
      <EventSelector setGlobalState={setGlobalState} globalState={globalState} />
      <EventPeopleCounter
        peopleByEvent={globalState.peopleByEvent}
        peopleNotCheckedIn={globalState.peopleNotCheckedIn}
        peopleByGroup={globalState.peopleByGroup} />
      <PeopleTable setGlobalState={setGlobalState} globalState={globalState} />
    </Conteiner>
  );
};
