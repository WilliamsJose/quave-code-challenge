import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useEventSelector } from '../../hook/selector/useEventSelector';

export const EventSelector = () => {
  const { options, communitiesLoading, handleSelectedEvent } = useEventSelector();
  return (
    <Autocomplete
      className="mt-4 mb-2"
      disablePortal
      id="combo-box"
      options={options}
      onChange={handleSelectedEvent}
      renderInput={(params) => <TextField {...params} label={communitiesLoading ? 'loading...' : 'Select an event'} />}
    />
  );
};
