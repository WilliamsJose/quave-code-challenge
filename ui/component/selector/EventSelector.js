import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFindCommunitiesBy } from '../../hook';

export const EventSelector = ({ setSelectedCommunity }) => {
  const [communitiesLoading, communitiesFound] = useFindCommunitiesBy();
  const [options, setOptions] = useState([]);

  const handleSelectedEvent = (event, selected) => {
    event.preventDefault();
    setSelectedCommunity(selected ? { communityId: selected.id } : {});
  };

  const setCommunities = (communities) => {
    setOptions(
      communities.reduce((acc, community) => (
        [{ label: community.name, id: community._id }, ...acc]
      ), [])
    );
  };

  useEffect(() => {
    if (!communitiesLoading) {
      setCommunities(communitiesFound);
    }
  }, [communitiesLoading]);

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
