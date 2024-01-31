import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from "../../communities/communities";

export const useFindCommunitiesBy = (search) => {
  return useTracker(() => {
    const handle = Meteor.subscribe('communities');
    const loading = !handle.ready();
    const found = Communities.find(search ?? {}).fetch();
    return {
      loading,
      found,
    };
  });
}