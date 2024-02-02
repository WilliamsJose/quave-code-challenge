import { Button } from '@mui/material';
import React, { useState } from 'react';

// for time being, i'll let host to be able to check in again, but this decision is needed to be ruled by
// a talk with PO.
export const GridButton = (row, onClick) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [action, setAction] = useState(true);
  const { id: rowId } = row;

  return (
    <div>
      <Button
        key={rowId}
        variant="contained"
        disabled={isDisabled}
        onClick={
          () => {
            setIsDisabled(true);
            onClick(row);
            setTimeout(() => {
              setAction(prevState => !prevState);
              setIsDisabled(false);
            }, 5000);
          }
        }
      >
        {action ? 'Check In' : 'Check Out' }
      </Button>
    </div>
  );
};
