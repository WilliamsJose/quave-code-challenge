import { useEffect, useState } from "react";
import { useFindPeopleBy } from "../repository/useFindPeopleBy";
import { GridButton } from "../../component/datagrid/GridButton";

export const usePeopleTable = (community) => {
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
      renderCell: (params) => GridButton(params.row, handleClick),
    },
  ];

  const isRowCheckIn = (row) => {
    const timeCheckIn = new Date(row.checkIn !== 'N/A' ? row.checkIn : 0);
    const timeCheckOut = new Date(row.checkOut  !== 'N/A' ? row.checkOut  : 0);
    return timeCheckIn <= timeCheckOut;
  }

  // i should save the date check in and out in a new collection like 'people_event'. 
  const handleClick = (row) => {
    const currentFormattedDate = new Date().toLocaleString().slice(0, -6);
    const updateCheckInOut = isRowCheckIn(row) 
      ? { ...row, checkIn: currentFormattedDate } 
      : { ...row, checkOut: currentFormattedDate }

    setRows((prevRows) => {
      const clickRowId = row.id;
      return prevRows.map((row, idx) => row.id === clickRowId ? updateCheckInOut : row);
    })
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

  return {
    columns, rows
  }
}