import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../../communities/communities';

export const useFindCommunitiesBy = search => {
  return useTracker(() => {
    const handle = Meteor.subscribe('communities');
    const communitiesLoading = !handle.ready();
    const communitiesFound = Communities.find(search ?? {}).fetch();
    return [
      communitiesLoading,
      communitiesFound,
    ];
  }, [search]);
};
