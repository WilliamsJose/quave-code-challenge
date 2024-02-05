import { useEffect, useState } from 'react';
import { useFindCommunitiesBy } from '../repository/useFindCommunitiesBy';

export const useEventSelector = (setGlobalState, globalState) => {
  const [communitiesLoading, communitiesFound] = useFindCommunitiesBy();
    const [options, setOptions] = useState([]);

    const handleSelectedEvent = (event, selected) => {
      event.preventDefault();
      setGlobalState(selected ? { ...globalState, selectedCommunity: { communityId: selected.id } } : { ...globalState, selectedCommunity: {} });
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
