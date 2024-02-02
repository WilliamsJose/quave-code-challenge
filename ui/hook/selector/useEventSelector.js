import { useEffect, useState } from 'react';
import { useFindCommunitiesBy } from '../repository/useFindCommunitiesBy';

export const useEventSelector = (setSelectedCommunity) => {
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

    return {
      options, communitiesLoading, handleSelectedEvent,
    };
};
