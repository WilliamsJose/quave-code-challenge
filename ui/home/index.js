import { Autocomplete, Divider, TextField } from '@mui/material';
import React from 'react';
import { BoxDataGrid } from '../component/datagrid/BoxDataGrid';
import { People } from '../../people/people';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const options = [
  { label: 'test', id: 1 },
  { label: 'best', id: 2 },
];

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
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'fullName',
    headerName: 'Name',
    width: 140,
    editable: false,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 140,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 140,
    editable: false,
  },
  {
    field: 'checkIn',
    headerName: 'Check-in',
    type: 'Date',
    width: 140,
    editable: false,
  },
  {
    field: 'checkOut',
    headerName: 'Check-out',
    type: 'Date',
    width: 140,
    editable: false,
  },
];

const rows = [
  { id: 1, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 11:15', checkOut: '30/21/24 13:45' },
  { id: 2, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 12:15', checkOut: '30/21/24 13:45' },
  { id: 3, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 13:15', checkOut: '30/21/24 13:45' },
  { id: 4, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 14:15', checkOut: '30/21/24 16:45' },
  { id: 5, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 14:15', checkOut: '30/21/24 17:45' },
  { id: 6, fullName: 'Maria Carla', company: 'Green Group', title: 'UX/UI', checkIn: '30/21/24 14:15', checkOut: '30/21/24 16:45' },
];

export const Home = () => {
  const newPerson = useTracker(() => {
    const handle = Meteor.subscribe('people');
    const loading = !handle.ready();
    const person = People.findOne({ firstName: 'Carl' });
    console.log(person);
    return {
      person,
      loading,
    };
  });

  return (
    <div className="mx-auto text-center max-w-md">
      <Divider className="mt-2 mb-2" />
      {newPerson.loading ? 'loading' : newPerson.person.firstName}
      <Autocomplete
        className="mt-4 mb-2"
        disablePortal
        id="combo-box"
        options={options}
        renderInput={(params) => <TextField {...params} label="Select an event" />}
      />
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {peopleInEvent}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {peopleNotCheckedIn}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {joinGroupsStr}</p>
      <BoxDataGrid columns={columns} rows={rows} key="box-data-grid" classes="mt-4" />
    </div>
  );
};
