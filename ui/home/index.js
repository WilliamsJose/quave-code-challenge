import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { PeopleTable } from '../component/datagrid/PeopleTable';
import { EventSelector } from '../component/selector/EventSelector';
import { EventDisplay } from '../component/display/EventDisplay';

export const Home = () => {
  const [selectedCommunity, setSelectedCommunity] = useState({});

  // eslint-disable-next-line no-console
  console.log('home reloaded');

  return (
    <div className="mx-auto text-center max-w-2xl">
      <Divider className="mt-2 mb-2" />
      <EventSelector setSelectedCommunity={setSelectedCommunity} />
      <EventDisplay />
      <PeopleTable classes="mt-4" community={selectedCommunity} />
    </div>
  );
};
