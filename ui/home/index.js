import { Autocomplete, Button, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoxDataGrid } from '../component/datagrid/BoxDataGrid';
import { useFindPeopleBy, useFindCommunitiesBy } from '../hook';
import { EventSelector } from '../component/selector/EventSelector';

export const Home = () => {
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [rows, setRows] = useState([]);
  
  const [peopleLoading, peopleFound] = useFindPeopleBy(selectedCommunity);

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
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        params.row.checkOut === 'N/A' ?
        <Button variant='contained' onClick={() => handleClick(params.row)}>
          {params.row.checkIn === 'N/A' ? 'Check In' : 'Check Out'}
        </Button> : undefined
      ),
    },
  ];
  

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

  const handleClick = (row) => {
    console.log(row)
  }

  

  useEffect(() => {
    if (!peopleLoading) {
      setPeople(peopleFound)
    }
  }, [peopleLoading]);

  return (
    <div className="mx-auto text-center max-w-2xl">
      <Divider className="mt-2 mb-2" />
      <EventSelector setSelectedCommunity={setSelectedCommunity} />
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {0}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {rows.length}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {0}</p>
      <BoxDataGrid columns={columns} rows={rows} classes="mt-4" />
    </div>
  );
};
