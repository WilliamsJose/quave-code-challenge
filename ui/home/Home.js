import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { PeopleTable } from '../component/datagrid/PeopleTable';
import { EventSelector } from '../component/selector/EventSelector';
import { EventPeopleCounter } from '../component/display/EventPeopleCounter';
import { Conteiner } from '../component/conteiner/Conteiner';

export const Home = () => {
  // to share state between components, maybe an lib can do better
  const [selectedCommunity, setSelectedCommunity] = useState({});

  return (
    <Conteiner>
      <Divider className="mt-4 mb-2" />
      <EventSelector setSelectedCommunity={setSelectedCommunity} />
      <EventPeopleCounter />
      <PeopleTable community={selectedCommunity} />
    </Conteiner>
  );
};
