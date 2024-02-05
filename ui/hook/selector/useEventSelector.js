import { useContext, useEffect, useState } from 'react';
import { useFindCommunitiesBy } from '../repository/useFindCommunitiesBy';
import { HomeContext } from '../context/HomeContext';

export const useEventSelector = () => {
  const { homeState, updateHomeState } = useContext(HomeContext);
  const [communitiesLoading, communitiesFound] = useFindCommunitiesBy();
  const [options, setOptions] = useState([]);

  const handleSelectedEvent = (event, selected) => {
    event.preventDefault();
    updateHomeState(selected ? { ...homeState, selectedCommunity: { communityId: selected.id } } : { ...homeState, selectedCommunity: {} });
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

  return {
    options, communitiesLoading, handleSelectedEvent,
  };
};
