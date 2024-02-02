import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFindPeopleBy } from '../../hook';

export const PeopleTable = ({ classes, community }) => {
  const [peopleLoading, peopleFound] = useFindPeopleBy(community);
  const [rows, setRows] = useState([]);
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
      renderCell: (params) => renderButton(params.row),
    },
  ];

  const renderButton = (row) => (
    row.checkOut === 'N/A' ?
    <Button variant='contained' onClick={() => handleClick(row)}>
      {row.checkIn === 'N/A' ? 'Check In' : 'Check Out'}
    </Button> : undefined
  )
  
  const handleClick = (row) => {
    console.log(row);
  };

  const setPeople = (people) => {
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

  useEffect(() => {
    if (!peopleLoading) {
      setPeople(peopleFound);
    }
  }, [peopleLoading]);

  return (
    <Box className={classes}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};
