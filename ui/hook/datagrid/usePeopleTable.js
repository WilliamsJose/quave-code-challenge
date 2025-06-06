import { useContext, useEffect, useState } from "react";
import { useFindPeopleBy } from "../repository";
import { GridButton } from "../../component/datagrid/GridButton";
import { HomeContext } from "../context/HomeContext";

export const usePeopleTable = () => {
  const { homeState, updateHomeState } = useContext(HomeContext);
  // Everytime select a community, the checkedIn people will reset bcs im not saving this data yet.
  const [peopleLoading, peopleFound] = useFindPeopleBy(homeState.selectedCommunity);
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
    let timeCheckIn = new Date(row.checkIn);
    timeCheckIn = !isNaN(timeCheckIn.valueOf()) ? timeCheckIn : new Date(0);
    
    let timeCheckOut = new Date(row.checkOut);
    timeCheckOut = !isNaN(timeCheckOut.valueOf()) ? timeCheckOut : new Date(0);
    
    return timeCheckIn <= timeCheckOut;
  }

  // i should save the date check in and out in a new collection like 'people_event'. 
  const handleClick = (row) => {
    const currentFormattedDate = new Date().toLocaleString().slice(0, -6);
    const updateCheckInOut = isRowCheckIn(row) 
      ? { ...row, checkIn: currentFormattedDate } 
      : { ...row, checkOut: currentFormattedDate };

    setRows((prevRows) => {
      const clickRowId = row.id;
      return prevRows.map((row, idx) => row.id === clickRowId ? updateCheckInOut : row);
    });

    updateHomeState({ ...homeState, snack: {open: true, message: `${row.fullName} has ${isRowCheckIn(row) ? 'checked in!' : 'checked out'}`} });
  };

  const updatePeopleCounter = (homeState, updateHomeState, rows) => {
    const peopleByEvent = rows.length;
    
    let peopleNotCheckedIn = 0;
    
    let peopleByGroup = rows.reduce((accumulator, currentRow) => {
      const { checkIn, company } = currentRow;
      
      if (checkIn === 'N/A') {
        peopleNotCheckedIn++;
      }
      
      if (accumulator[company]) {
        accumulator[company]++;
      } else {
        accumulator[company] = 1;
      }
      
      return accumulator;
    }, {});

    updateHomeState({...homeState, peopleByEvent, peopleNotCheckedIn, peopleByGroup });
  }

  // here i should have to get checkIn and checkOut from another collection/Table and map
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

  useEffect(() => {
    updatePeopleCounter(homeState, updateHomeState, rows);
  }, [rows]);

  return {
    columns, rows
  }
}