import { Autocomplete, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoxDataGrid } from '../component/datagrid/BoxDataGrid';
import { useFindPeopleBy, useFindCommunitiesBy } from '../hook';

const peopleInEvent = 18;
const groups = [
  { name: 'green group', count: 10 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
];
const joinGroupsStr = groups.map(group => `${group.name} (${group.count})`).join(', ');
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'fullName',
    headerName: 'Name',
    width: 160,
    editable: false,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 160,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 160,
    editable: false,
  },
  {
    field: 'checkIn',
    headerName: 'Check-in',
    type: 'Date',
    width: 160,
    editable: false,
  },
  {
    field: 'checkOut',
    headerName: 'Check-out',
    type: 'Date',
    width: 160,
    editable: false,
  },
];

export const Home = () => {
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState({})
  const [peopleLoading, peopleFound] = useFindPeopleBy(selectedCommunity)
  const [communitiesLoading, communitiesFound] = useFindCommunitiesBy();
  
  function setCommunities(communities) {
    setOptions(
      communities.reduce((acc, community) => (
        [{ label: community.name, id: community._id }, ...acc]
      ), [])
    );
  }

  function setPeople(people) {
    setRows(
      people.reduce((acc, person) => (
        [{
          id: person._id,
          fullName: [person.firstName, person.lastName].join(' '),
          company: person.companyName,
          title: person.title,
          checkIn: person.checkIn ?? 'N/A',
          checkOut: person.checkOut ?? 'N/A',
        }, ...acc]
      ), [])
    );
  }

  console.log('home reloaded');

  const handleSelected = (event, selected) => {
    event.preventDefault();
    if (selected) {
      setSelectedCommunity({ communityId: selected.id });
    } else {
      setSelectedCommunity({})
    }
  }

  useEffect(() => {
    if (!communitiesLoading) {
      setCommunities(communitiesFound)
    }
  }, [communitiesLoading]);

  useEffect(() => {
    if (!peopleLoading) {
      setPeople(peopleFound)
    }
  }, [peopleLoading]);

  return (
    <div className="mx-auto text-center max-w-2xl">
      <Divider className="mt-2 mb-2" />
      <Autocomplete
        className="mt-4 mb-2"
        disablePortal
        id="combo-box"
        options={options}
        onChange={handleSelected}
        renderInput={(params) => <TextField {...params} label={communitiesLoading ? 'loading' : 'Select an event'} />}
      />
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {peopleInEvent}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {rows.length}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {joinGroupsStr}</p>
      <BoxDataGrid columns={columns} rows={rows} key="box-data-grid" classes="mt-4" />
    </div>
  );
};
