import { Autocomplete, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoxDataGrid } from '../component/datagrid/BoxDataGrid';
import { People } from '../../people/people';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Communities } from '../../communities/communities';

const peopleInEvent = 18;
const groups = [
  { name: 'green group', count: 10 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
  { name: 'hoppe group', count: 5 },
];
const peopleNotCheckedIn = 132;

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

  const communities = useTracker(() => {
    const handle = Meteor.subscribe('communities');
    const loading = !handle.ready();
    const foundCommunities = Communities.find().fetch();
    return {
      loading,
      foundCommunities,
    };
  });

  const people = useTracker(() => {
    const handle = Meteor.subscribe('people');
    const loading = !handle.ready();
    const foundPeople = People.find().fetch();
    return {
      foundPeople,
      loading,
    };
  });

  useEffect(() => {
    if (!communities.loading) {
      setOptions(prevOptions => (
        communities.foundCommunities.reduce((acc, community) => (
          [{ label: community.name, id: community.name }, ...acc]
        ), prevOptions)
      ));
    }
  }, [communities.loading]);

  useEffect(() => {
    if (!people.loading) {
      setRows(prevOptions => (
        people.foundPeople.reduce((acc, person) => (
          [{
            id: person._id,
            fullName: [person.firstName, person.lastName].join(' '),
            company: person.companyName,
            title: person.title,
          }, ...acc]
        ), prevOptions)
      ));
    }
  }, [people.loading]);

  return (
    <div className="mx-auto text-center max-w-md">
      <Divider className="mt-2 mb-2" />
      <Autocomplete
        className="mt-4 mb-2"
        disablePortal
        id="combo-box"
        options={options}
        renderInput={(params) => <TextField {...params} label={communities.loading ? 'loading' : 'Select an event'} />}
      />
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {peopleInEvent}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {peopleNotCheckedIn}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {joinGroupsStr}</p>
      <BoxDataGrid columns={columns} rows={rows} key="box-data-grid" classes="mt-4" />
    </div>
  );
};
